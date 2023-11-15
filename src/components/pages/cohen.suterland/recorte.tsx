import DesenharReta from "./DesenharReta"
import { Reta } from "./Conteiner"
import _, { forEach } from 'lodash'
import DesenharRetaCorte from "./DesenharRetaCorte"

const Recorte = (tamanho: number, tamanhoWidth: number, tamanhoHeight: number, retas: Reta[], xmin: number, ymin: number, xmax: number, ymax: number, ctx: any) => {
    const retasNovas = _.cloneDeep(retas)

    retasNovas.forEach((reta) => {
        /* //  console.log("DesenhaTela",reta )
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
   
               
               while (true) {
                   console.log("code",code1,"|",code2)
                   if ((code1 === 0) && (code2 === 0)) {
                       // Ambos puntos están dentro de la ventana de recorte
                       return { xInicial: x1, yInicial: y1, xFinal: x2, yFinal: y2, cor: reta.cor }
                   }
   
                   else if ((code1 & code2) !== 0) {
                       console.log("estao diferente")
                       // Los puntos están en la misma región externa, por lo que el segmento está completamente fuera
                       return null
                   }
   
                   // Seleccionar el punto exterior y actualizar sus coordenadas
                   let code_out: number = code1 !== 0 ? code1 : code2
   
                   if (code_out & TOP) {
                       console.log("top")
                       x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1)
                       y = ymax
                   }
                   else if (code_out & BOTTOM) {
                       console.log("bottom")
                       x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1)
                       y = ymin
                   }
                   else if (code_out & RIGHT) {
                       console.log("riggt")
                       y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1)
                       x = xmax
                   }
                   else if (code_out & LEFT) {
                       console.log("left")
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
   
           if(result){
               
               DesenharRetaCorte(tamanhoHeight, tamanhoHeight, result, ctx) 
               console.log("result",result,"|",xInicial,"|", yInicial,"|", xFinal,"|", yFinal)
           }else {
               console.log("A reta esta completamente fora")
           }*/

        const INSIDE = 0; // 0000
        const LEFT = 1;   // 0001
        const RIGHT = 2;  // 0010
        const BOTTOM = 4; // 0100
        const TOP = 8;    // 1000

        function calculateCode(x:number, y:number, xmin:number, xmax:number, ymin:number, ymax:number) {
            let code = INSIDE;

            if (x < xmin) {
                code |= LEFT;
            } else if (x > xmax) {
                code |= RIGHT;
            }

            if (y < ymin) {
                code |= BOTTOM;
            } else if (y > ymax) {
                code |= TOP;
            }

            return code;
        }

        function cohenSutherland(x1:number, y1:number, x2:number, y2:number, xmin:number, xmax:number, ymin:number, ymax:number) {
            let code1 = calculateCode(x1, y1, xmin, xmax, ymin, ymax);
            let code2 = calculateCode(x2, y2, xmin, xmax, ymin, ymax);

            while (true) {
                console.log("code",code1,"|",code2)
                if ((code1 === 0) && (code2 === 0)) {
                    return { xInicial: x1, yInicial: y1, xFinal: x2, yFinal: y2, cor: reta.cor }
                } else if ((code1 & code2) !== 0) {
                    return null
                }

                let code_out = code1 !== 0 ? code1 : code2;

                let x=0, y=0;

                if (code_out & TOP) {
                    x = x1 + (x2 - x1) * (ymax - y1) / (y2 - y1);
                    y = ymax;
                } else if (code_out & BOTTOM) {
                    x = x1 + (x2 - x1) * (ymin - y1) / (y2 - y1);
                    y = ymin;
                } else if (code_out & RIGHT) {
                    y = y1 + (y2 - y1) * (xmax - x1) / (x2 - x1);
                    x = xmax;
                } else if (code_out & LEFT) {
                    y = y1 + (y2 - y1) * (xmin - x1) / (x2 - x1);
                    x = xmin
                }

                if (code_out === code1) {
                    x1 = x
                    y1 = y
                    code1 = calculateCode(x1, y1, xmin, xmax, ymin, ymax);
                } else {
                    x2 = x
                    y2 = y
                    code2 = calculateCode(x2, y2, xmin, xmax, ymin, ymax);
                }
            }
        }

        // Exemplo de uso
       // let x1 = 50, y1 = 30, x2 = 150, y2 = 90;
       // let xmin = 60, xmax = 140, ymin = 40, ymax = 80;
        let result = cohenSutherland(reta.xInicial, reta.yInicial,reta.xFinal, ymin, xmin, xmax, ymin, ymax)

        if (result) {
            DesenharRetaCorte(tamanhoHeight, tamanhoHeight, result, ctx) 

            console.log(`Segmento recortado: (${result.xInicial}, ${result.yInicial}) a (${result.xFinal}, ${result.yFinal})`);
        } else {
            console.log("El segmento está completamente fuera de la ventana de recorte");
        }

    })

}
export default Recorte