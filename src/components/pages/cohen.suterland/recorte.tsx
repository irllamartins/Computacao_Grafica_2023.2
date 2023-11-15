import DesenharReta from "./DesenharReta"
import { Reta } from "./Conteiner"
import _, { forEach } from 'lodash'
import DesenharRetaCorte from "./DesenharRetaCorte"


enum Bits{
    DENTRO = 0, // 0000
    ESQUERDA = 1,   // 0001
    DIREITA = 2,  // 0010
    BAIXO = 4, // 0100
    CIMA = 8    // 1000
}
const Recorte = (tamanho: number, retas: Reta[], xmin: number, ymin: number, xmax: number, ymax: number, ctx: any) => {
    const retasNovas = _.cloneDeep(retas)

    retasNovas.forEach((reta) => {
       
        

        function calcularBit(x:number, y:number, xmin:number, xmax:number, ymin:number, ymax:number) {
            let bits = Bits.DENTRO

            if (x < xmin) {
                bits |= Bits.ESQUERDA
            } else if (x > xmax) {
                bits |= Bits.DIREITA
            }

            if (y < ymin) {
                bits |= Bits.BAIXO
            } else if (y > ymax) {
                bits |= Bits.CIMA
            }

            return bits;
        }

        function cohenSutherland(x1:number, y1:number, x2:number, y2:number, xmin:number, xmax:number, ymin:number, ymax:number) {
            let bits1 = calcularBit(x1, y1, xmin, xmax, ymin, ymax);
            let bits2 = calcularBit(x2, y2, xmin, xmax, ymin, ymax);

            while (true) {
                console.log("bits",bits1,"|",bits2)
                if ((bits1 === 0) && (bits2 === 0)) {
                    return { xInicial: x1, yInicial: y1, xFinal: x2, yFinal: y2, cor: reta.cor }
                } else if ((bits1 & bits2) !== 0) {
                    return null
                }

                let bitsAtual = bits1 !== 0 ? bits1 : bits2;

                let x=0, y=0;

                if (bitsAtual & Bits.CIMA) {
                    x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                    y = ymax;
                } else if (bitsAtual & Bits.BAIXO) {
                    x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                    y = ymin;
                } else if (bitsAtual & Bits.DIREITA) {
                    y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                    x = xmax;
                } else if (bitsAtual & Bits.ESQUERDA) {
                    y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                    x = xmin
                }

                if (bitsAtual === bits1) {
                    x1 = x
                    y1 = y
                    bits1 = calcularBit(x1, y1, xmin, xmax, ymin, ymax);
                } else {
                    x2 = x
                    y2 = y
                    bits2 = calcularBit(x2, y2, xmin, xmax, ymin, ymax);
                }
            }
        }

        let result = cohenSutherland(reta.xInicial, reta.yInicial,reta.xFinal,reta.yFinal, xmin, xmax, ymin, ymax)

        if (result) {
            DesenharRetaCorte(tamanho, result, ctx) 

            console.log(`Segmento recortado: (${result.xInicial}, ${result.yInicial}) a (${result.xFinal}, ${result.yFinal})`);
        } else {
            console.log("O segmento esta fora");
        }

    })

}
export default Recorte