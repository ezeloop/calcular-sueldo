const express = require('express');
const path = require('path');


const mainController = {
    indeX(req, res) {
        res.sendFile(path.join(__dirname, '../index.html'));
    },

    result(req, res) {
        const hsDomingos = req.body.hsDomingos || 0;
        const hsFeriados = req.body.hsFeriados || 0;
        const diasFalta = req.body.diasFalta;
        const jornadaH = req.body.jornadaH;
        const antiguedad = req.body.antiguedad;
        const hsAdicionalesPart = req.body.hsAdicionalesPart;


        let sueldoBasicoFull = 36690;
        const diaDomingoTrabajado = 1497;
        const hsDiaDomFeriado = diaDomingoTrabajado / 8;
        const diaTrabajo = 1248;
        const hsDiaTrabajo = diaTrabajo / 8;
        let presentismo = 0;

        let incrementoSolidario = 0;
        let acuerdo2019 = 0;



        //el sueldo ya sumado con la antiguedad que ingreso en el input
        const saldoApagarHsDom = hsDomingos * hsDiaDomFeriado;
        const saldoApagarHsFeriado = hsFeriados * hsDiaDomFeriado
        const sueldoConAntiguedad = sueldoBasicoFull + sueldoBasicoFull * (antiguedad / 100);
        const hsPartTime = sueldoConAntiguedad / 200;

        if (jornadaH == 'part-80') {
            var sueldoBasico = hsPartTime * 80;

            incrementoSolidario = 1600;
            acuerdo2019 = 800;

            let saldoHsAdicionalPart = hsAdicionalesPart * hsPartTime;

            presentismo = (sueldoBasico + saldoApagarHsDom + saldoApagarHsFeriado + saldoHsAdicionalPart) * 0.083

            var sueldoHaberConDesc = sueldoBasico + saldoApagarHsFeriado + saldoApagarHsDom + presentismo + acuerdo2019 + incrementoSolidario + saldoHsAdicionalPart;


            let jubilacion = 0.11 * sueldoHaberConDesc
            let ley19032 = 0.03 * sueldoHaberConDesc
            let sindicatoAgec = 0.025 * sueldoHaberConDesc;
            let obraSocial = 0.045 * sueldoHaberConDesc;
            let anssal = 0.008 * sueldoHaberConDesc;


            var descuentos = jubilacion + ley19032 + anssal + obraSocial + sindicatoAgec;

            let falloCaja = (sueldoBasico * 3361.9) / sueldoConAntiguedad

            let sueldoNeto = sueldoHaberConDesc - descuentos + falloCaja;

            const data = {
                sueldoBasico,
                sueldoConAntiguedad,
                sueldoNeto,
                saldoApagarHsDom,
                saldoApagarHsFeriado,
                presentismo,
                jubilacion,
                anssal,
                ley19032,
                obraSocial,
                sindicatoAgec,
                saldoHsAdicionalPart,
                incrementoSolidario,
                acuerdo2019,
                falloCaja
            }

            return res.render('result', data);

        }

        if (jornadaH == 'part-120') {
            sueldoBasico = hsPartTime * 120;
            let saldoHsAdicionalPart = hsAdicionalesPart * hsPartTime;

            incrementoSolidario = 2500;
            acuerdo2019 = 625;

            presentismo = 0;
            presentismo = (sueldoBasico + saldoApagarHsDom + saldoApagarHsFeriado + saldoHsAdicionalPart) * 0.083

            sueldoHaberConDesc = sueldoBasico + saldoApagarHsFeriado + saldoApagarHsDom + presentismo + acuerdo2019 + incrementoSolidario + saldoHsAdicionalPart;

            let jubilacion = 0.11 * sueldoHaberConDesc
            let ley19032 = 0.03 * sueldoHaberConDesc
            let sindicatoAgec = 0.025 * sueldoHaberConDesc;
            let obraSocial = 0.03 * sueldoHaberConDesc;
            let anssal = 0.0054 * sueldoHaberConDesc;

            let descuentos = jubilacion + ley19032 + anssal + obraSocial + sindicatoAgec;

            let falloCaja = (sueldoBasico * 3361.9) / sueldoConAntiguedad;

            let sueldoNeto = sueldoHaberConDesc - descuentos + falloCaja;

            const data = {
                sueldoBasico,
                sueldoConAntiguedad,
                sueldoNeto,
                saldoApagarHsDom,
                saldoApagarHsFeriado,
                presentismo,
                jubilacion,
                anssal,
                ley19032,
                obraSocial,
                sindicatoAgec,
                saldoHsAdicionalPart,
                incrementoSolidario,
                acuerdo2019,
                falloCaja
            }

            return res.render('result', data);

        } else {

            presentismo = (sueldoConAntiguedad + saldoApagarHsDom + saldoApagarHsFeriado) * 0.083
            incrementoSolidario = 4000;
            acuerdo2019 = 2000;

            let sueldoHaberConDesc = sueldoConAntiguedad + saldoApagarHsFeriado + saldoApagarHsDom + presentismo + acuerdo2019 + incrementoSolidario;

            sueldoBasico = sueldoConAntiguedad;


            jubilacion = 0.11 * sueldoHaberConDesc
            ley19032 = 0.03 * sueldoHaberConDesc
            sindicatoAgec = 0.025 * sueldoHaberConDesc;
            obraSocial = 0.0255 * sueldoHaberConDesc;
            anssal = 0.0045 * sueldoHaberConDesc;


            let descuentos = jubilacion + ley19032 + anssal + obraSocial + sindicatoAgec;

            let falloCaja = 3361.9;
            sueldoNeto = sueldoHaberConDesc - descuentos + falloCaja;
        }


        const data = {
            sueldoBasico,
            sueldoConAntiguedad,
            sueldoNeto,
            saldoApagarHsDom,
            saldoApagarHsFeriado,
            presentismo,
            jubilacion,
            anssal,
            ley19032,
            obraSocial,
            sindicatoAgec,
            saldoHsAdicionalPart,
            incrementoSolidario,
            acuerdo2019,
            falloCaja
        }

       return  res.render('result', data);
    }
}

module.exports = mainController