"use client"

import { useRouter } from "next/navigation"

const Admin = () => {
    
    const router = useRouter()


    return (
        <div className="bg-gray-900 bg-cover bg-no-repeat h-full" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80")'}}>
            <div className="flex items-center justify-center h-full">
                <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded-3xl border-2 border-black p-12 backdrop-blur-md cursor-pointer" onClick={() => router.push('admin/access')}>
                        <p className="text-black text-center">Access</p>
                    </div>
                    <div className="border rounded-3xl border-2 border-black p-12 backdrop-blur-md cursor-pointer" onClick={() => router.push('admin/question')}>
                        <p className="text-black text-center">Set Questions</p>
                    </div>
                    <div className="border rounded-3xl border-2 border-black p-12 backdrop-blur-md cursor-pointer" onClick={() => router.push('admin/download')}>
                        <p className="text-black text-center">Download DB</p>
                    </div>
                    <div className="border rounded-3xl border-2 border-black p-12 backdrop-blur-md cursor-pointer" onClick={() => router.push('admin/access')}>
                        <p className="text-black text-center">Coming soon...</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
