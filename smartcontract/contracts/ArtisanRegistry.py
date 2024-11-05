from pyteal import *

def artisan_registry():
    # State keys
    artisan_status = Bytes("status")
    verification_level = Bytes("ver_level")
    rating = Bytes("rating")

    @Subroutine(TealType.none)
    def register_artisan():
        return Seq([
            App.localPut(Int(0), artisan_status, Int(1)),  # 1 = Registered
            App.localPut(Int(0), verification_level, Int(0)),
            App.localPut(Int(0), rating, Int(0))
        ])

    @Subroutine(TealType.none)
    def verify_artisan(artisan_addr, level):
        return Seq([
            Assert(Txn.sender() == Global.creator_address()),
            App.localPut(Int(0), verification_level, level)
        ])

    program = Cond(
        [Txn.application_id() == Int(0), Return(Int(1))],
        [Txn.on_completion() == OnComplete.OptIn, Return(Int(1))],
        [Txn.application_args[0] == Bytes("register"), register_artisan()],
        [Txn.application_args[0] == Bytes("verify"), verify_artisan(Txn.accounts[1], Btoi(Txn.application_args[1]))]
    )

    return program

if __name__ == "__main__":
    print(compileTeal(artisan_registry(), Mode.Application, version=6))