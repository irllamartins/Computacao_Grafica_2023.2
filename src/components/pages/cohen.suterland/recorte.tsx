import DesenharReta from "./DesenharReta"
import { Reta } from "./Conteiner"
import _, { forEach } from 'lodash'
import DesenharRetaCorte from "./DesenharRetaCorte"

const Recorte = (tamanho: number, tamanhoWidth: number, tamanhoHeight: number, retas: Reta[], xInicial: number, yInicial: number, xFinal: number, yFinal: number, ctx: any) => {
    const retasNovas = _.cloneDeep(retas)

    retasNovas.forEach((reta) => {
      //  console.log("DesenhaTela",reta )
        // Definir los códigos de recorte para una ventana de recorte rectangular
        const INSIDE = 0  // 0000
        const LEFT = 1    // 0001
        const RIGHT = 2   // 0010
        const BOTTOM = 4  // 0100
        const TOP = 8     // 1000

        // Función para calcular el código de recorte de un punto (x, y) con respecto a la ventana de recorte
        const calculate_code = (x: number, y: number, xmin: number, xmax: number, ymin: number, ymax: number): number => {
            let code = INSIDE

            if (x < xmin) {
                code |= LEFT
            }

            else if (x > xmax) {
                code |= RIGHT
            }
            if (y < ymin) {
                code |= BOTTOM
            }
            else if (y > ymax) {
                code |= TOP
            }
            return code
        }
        // Función para recortar un segmento de línea (x1, y1) a (x2, y2) en la ventana de recorte
        const cohen_sutherland = (x1: number, y1: number, x2: number, y2: number, xmin: number, xmax: number, ymin: number, ymax: number) => {
            let code1: number = calculate_code(x1, y1, xmin, xmax, ymin, ymax)
            let code2: number = calculate_code(x2, y2, xmin, xmax, ymin, ymax)
            let x = 0
            let y = 0

            console.log("code",code1,"|",code2)

            while (true) {
                if (code1 === 0 && code2 === 0) {
                    // Ambos puntos están dentro de la ventana de recorte
                    return { xInicial: x1, yInicial: y1, xFinal: x2, yFinal: y2, cor: reta.cor }
                }

                if ((code1 & code2) !== 0) {
                    // Los puntos están en la misma región externa, por lo que el segmento está completamente fuera
                    return reta
                }

                // Seleccionar el punto exterior y actualizar sus coordenadas
                let code_out: number = code1 !== 0 ? code1 : code2

                if (code_out & TOP) {
                    x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1)
                    y = ymax
                }
                else if (code_out & BOTTOM) {
                    x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1)
                    y = ymin
                }
                else if (code_out & RIGHT) {
                    y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1)
                    x = xmax
                }
                else if (code_out & LEFT) {
                    y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1)
                    x = xmin
                }

                if (code_out === code1) {
                    x1 = x
                    y1 = y
                    code1 = calculate_code(x1, y1, xmin, xmax, ymin, ymax)
                }
                else {

                    x2 = x
                    y2 = y
                    code2 = calculate_code(x2, y2, xmin, xmax, ymin, ymax)
                }
            }
        }
        const result = cohen_sutherland(reta.xInicial, reta.yInicial, reta.xFinal, reta.yFinal,xInicial, yInicial, xFinal, yFinal)

        // console.log("result",result,"|",xInicial,"|", yInicial,"|", xFinal,"|", yFinal)
        DesenharRetaCorte(tamanhoHeight, tamanhoHeight, result, ctx) 
    })

}
export default Recorte