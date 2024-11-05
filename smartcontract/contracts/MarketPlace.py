from pyteal import *

def marketplace_contract():
    # Application state keys
    service_count = Bytes("service_count")
    service_price = Bytes("price")
    service_owner = Bytes("owner")
    service_status = Bytes("status")

    @Subroutine(TealType.none)
    def list_service(price):
        return Seq([
            App.globalPut(service_count, App.globalGet(service_count) + Int(1)),
            App.localPut(Int(0), service_price, price),
            App.localPut(Int(0), service_owner, Txn.sender()),
            App.localPut(Int(0), service_status, Int(1))  # 1 = Active
        ])

    @Subroutine(TealType.none)
    def book_service(service_id):
        return Seq([
            Assert(App.localGet(Int(0), service_status) == Int(1)),
            App.localPut(Int(0), service_status, Int(2))  # 2 = Booked
        ])

    program = Cond(
        [Txn.application_id() == Int(0), Return(Int(1))],
        [Txn.on_completion() == OnComplete.DeleteApplication, Return(Int(0))],
        [Txn.on_completion() == OnComplete.UpdateApplication, Return(Int(0))],
        [Txn.on_completion() == OnComplete.CloseOut, Return(Int(1))],
        [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))]
    )

    return program

if __name__ == "__main__":
    print(compileTeal(marketplace_contract(), Mode.Application, version=6))