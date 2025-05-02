'use client'

import { loadAdmin } from "@/redux/action/admin"
import { store } from "@/redux/store"
// import { store } from "@/lib/store/store"
import React, {ReactNode, useEffect} from "react"
import {Provider} from "react-redux"



interface ProviderProps {
    children?: ReactNode
}

export function Providers({children}: ProviderProps){
    useEffect(() => {
        store.dispatch<any>(loadAdmin()) // Dispatching the admin fetch here
      }, [])
    return <Provider store={store}>{children}</Provider>
}