from pyteal import *

def escrow_service():
    # State keys
    payment_amount = Bytes("amount")
    seller = Bytes("seller")
    buyer = Bytes("buyer")
    status = Bytes("status")

    @Subroutine(TealType.none)
    def create_escrow():
        return Seq([
            App.localPut(Int(0), payment_amount, Txn.amount()),
            App.localPut(Int(0), seller, Txn.accounts[1]),
            App.localPut(Int(0), buyer, Txn.sender()),
            App.localPut(Int(0), status, Int(1))  # 1 = Active
        ])

    @Subroutine(TealType.none)
    def release_payment():
        return Seq([
            Assert(App.localGet(Int(0), status) == Int(1)),
            Assert(Or(
                Txn.sender() == App.localGet(Int(0), buyer),
                Global.latest_timestamp() > App.localGet(Int(0), Bytes("timeout"))
            )),
            App.localPut(Int(0), status, Int(2)),  # 2 = Completed
            InnerTxnBuilder.Begin(),
            InnerTxnBuilder.SetFields({
                TxnField.type_enum: TxnType.Payment,
                TxnField.receiver: App.localGet(Int(0), seller),
                TxnField.amount: App.localGet(Int(0), payment_amount)
            }),
            InnerTxnBuilder.Submit()
        ])

    program = Cond(
        [Txn.application_id() == Int(0), Return(Int(1))],
        [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))],
        [Txn.application_args[0] == Bytes("create"), create_escrow()],
        [Txn.application_args[0] == Bytes("release"), release_payment()]
    )

    return program

if __name__ == "__main__":
    print(compileTeal(escrow_service(), Mode.Application, version=6))