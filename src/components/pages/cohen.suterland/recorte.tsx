import DesenharReta from "./DesenharReta"
import { Reta } from "./Conteiner"
import _, { forEach } from 'lodash'
import DesenharRetaCorte from "./DesenharRetaCorte"

const Recorte = (tamanho: number, retas: Reta[], xmin: number, ymin: number, xmax: number, ymax: number, ctx: any) => {
    const retasNovas = _.cloneDeep(retas)

    retasNovas.forEach((reta) => {
       
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