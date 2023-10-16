import DesenharReta from "../../util/DesenharReta";
import { Reta } from "./Conteiner";
import _, { forEach } from 'lodash';
import DesenharRetaCorte from "./DesenharRetaCorte";

const Recorte = (tamanho: number,tamanhoWidth: number,tamanhoHeight: number, retas: Reta[], xInicial: number, yInicial: number, xFinal: number, yFinal: number, ctx: any) => {
    const retasNovas = _.cloneDeep(retas)

    retasNovas.forEach((reta) => {
        const bit1Inicial = (reta.yInicial - yFinal) >= 0 ? "1" : "0"
        const bit2Inicial = (yInicial - reta.yInicial) >= 0 ? "1" : "0"
        const bit3Inicial = (reta.xInicial - xFinal) >= 0 ? "1": "0"
        const bit4Inicial = (xInicial - reta.xInicial) >= 0 ? "1" : "0"

        const bitInicial: string[] = (bit1Inicial + bit2Inicial + bit3Inicial + bit4Inicial).split("")

        const bit1Final = (reta.yFinal - yFinal) >= 0 ? "1" : "0"
        const bit2Final = (yInicial - reta.yFinal) >= 0 ? "1" : "0"
        const bit3Final = (reta.xFinal - xFinal) >= 0 ? "1" : "0"
        const bit4Final = (xInicial - reta.xFinal) >= 0 ? "1" : "0"

        const bitFinal: string[] = (bit1Final + bit2Final + bit3Final + bit4Final).split("")
        let binario: string[]=[]
        for(let i=0;i<bitInicial.length;i++){
            if(bit1Inicial[i]==bit1Final[i]&&bit1Final[i]=="1"){
                binario.push("1")
            }
            else{
               binario.push( "0") 
            }
            
        }
        // const binario: number = bitInicial & bitFinal
        console.log("Bitinicial:", bitInicial," | BitFinal:", bitFinal,"| uniao:", binario)
        if (binario.join("") === "0000") {

            // esquerda
            if (bitInicial[3] === "1") {
                reta.xInicial = xInicial
                const t = (xInicial - reta.xInicial) / (reta.xFinal - reta.xInicial)
                reta.yInicial = reta.yInicial + t * (reta.yFinal - reta.yInicial)
                console.log("bit 4 inicial ativado")

            }
            if (bitInicial[2] === "1") {
                reta.xInicial = xFinal
                const t = (xInicial - reta.xInicial) / (reta.xFinal - reta.xInicial)
                reta.yInicial = reta.yInicial + t * (reta.yFinal - reta.yInicial)
                console.log("bit 3 inicial ativado")
            }
            if (bitInicial[0] === "1") {
                reta.yInicial = yFinal
                const t = (yInicial - reta.yInicial) / (reta.yFinal - reta.yInicial)
                reta.xInicial = reta.xInicial + t * (reta.xFinal - reta.xInicial)
                console.log("bit 1 inicial ativado")
            }

            // final
            if (bitFinal[3] === "1") {
                reta.xFinal = xFinal
                const t = (xFinal - reta.xFinal) / (reta.xFinal - reta.xInicial)
                reta.yInicial = reta.yFinal + t * (reta.yFinal - reta.yInicial)
                console.log("bit 4 Final ativado x:", reta.xFinal, "|", reta.yInicial, "| t:", t)

            }
            if (bitFinal[2] === "1") {
                reta.xInicial = xFinal
                const t = (xInicial - reta.xInicial) / (reta.xFinal - reta.xInicial)
                reta.yInicial = reta.yInicial + t * (reta.yFinal - reta.yInicial)
                console.log("bit 3 final ativado")
            }
            if (bitFinal[0] === "1") {
                reta.yFinal = yInicial
                const t = (yFinal - reta.yInicial) / (reta.yFinal - reta.yInicial)
                reta.xInicial = reta.xInicial + t * (reta.xFinal - reta.xInicial)
                console.log("bit 1 final ativado")
            }
            /* if (bitInicial === 1001) {
                 const t = (yInicial - reta.yInicial) / (reta.yFinal - reta.yInicial)
                 reta.xInicial = reta.xInicial + t * (reta.xFinal - reta.xInicial)
             }*/
             DesenharRetaCorte(tamanhoHeight,tamanhoHeight,reta,ctx)
        }
    }

    )
    
}
export default Recorte