import { useContext } from "react"
import { MonleyContext } from "../context/context"

export const useMonleyContext = () => {
    const context = useContext(MonleyContext);
    if (context === undefined) {
        throw new Error("useMonleyContext must be used within a MonleyContextProvider");
    } 
    return context;

}