const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');




let sueldoBasicoFull = 36690;
const diaDomingoTrabajado = 1497;
const hsDiaDomFeriado = diaDomingoTrabajado/8;
const diaTrabajo = 1248;
const hsDiaTrabajo=diaTrabajo/8;
let presentismo=0;




let incrementoSolidario=0;
let acuerdo2019=0;




//haber sin desc



app.get("/", function(req, res){
    res.sendFile(__dirname+'/index.html');
});



app.post("/result", function(req, res){

  var antiguedad = req.body.antiguedad;
  var hsDomingos= 0;
  var hsFeriados= 0;

  hsDomingos= req.body.hsDomingos;
  hsFeriados= req.body.hsFeriados
  var diasFalta= req.body.diasFalta;
  var hsAdicionalesPart=req.body.hsAdicionalesPart;

  //console.log("data: ",req.body.jornadaH );

  //el sueldo ya sumado con la antiguedad que ingreso en el input
  

  var saldoApagarHsDom= hsDomingos * hsDiaDomFeriado;

  var saldoApagarHsFeriado= hsFeriados * hsDiaDomFeriado





    
    var sueldoConAntiguedad =sueldoBasicoFull+sueldoBasicoFull*(antiguedad/100);
 

    

    //parttime
    var hsPartTime=sueldoConAntiguedad/200;
   

    

    //sigo con full

   
   
    console.log("data: ",req.body.jornadaH );

    if(req.body.jornadaH =="part-80"){
      var sueldoBasico=hsPartTime*80;
      
      console.log("la hora del part es "+hsPartTime)
      console.log("el basico del part 80 es"+sueldoBasico)
     
      incrementoSolidario=1600;
      acuerdo2019=800;

      let saldoHsAdicionalPart= hsAdicionalesPart*hsPartTime;

      presentismo=(sueldoBasico+saldoApagarHsDom+saldoApagarHsFeriado+saldoHsAdicionalPart)*0.083
     
      var sueldoHaberConDesc= sueldoBasico+saldoApagarHsFeriado+saldoApagarHsDom+presentismo+acuerdo2019+incrementoSolidario+saldoHsAdicionalPart;


      let jubilacion=0.11*sueldoHaberConDesc
      let ley19032=0.03*sueldoHaberConDesc
      let sindicatoAgec=0.025*sueldoHaberConDesc;
      let obraSocial=0.045*sueldoHaberConDesc;
      let anssal=0.008*sueldoHaberConDesc;


  
    var descuentos = jubilacion+ley19032+anssal+obraSocial+sindicatoAgec;

    console.log("jubi"+jubilacion)
    console.log("anssal"+anssal)
    console.log("ley"+ley19032)
    console.log("os"+obraSocial)
    console.log("sindic"+sindicatoAgec)

    let falloCaja= (sueldoBasico*3361.9)/sueldoConAntiguedad

    let sueldoNeto = sueldoHaberConDesc-descuentos+falloCaja;

    //*** aca estaba */
    console.log("sueldo haber con desc"+sueldoHaberConDesc)
    console.log("desc "+descuentos)
    console.log("sueldo con ant"+sueldoConAntiguedad)
    console.log("sueldo neto part"+sueldoNeto)
    console.log("hs dom"+saldoApagarHsDom)
    console.log("hs feriado"+saldoApagarHsFeriado)
    console.log("presentismo part"+presentismo)
     console.log("estas en part80")
    
     const data = {
      sueldoBasico, sueldoConAntiguedad, sueldoNeto, saldoApagarHsDom, saldoApagarHsFeriado, presentismo, jubilacion, anssal, ley19032, obraSocial, sindicatoAgec, saldoHsAdicionalPart, incrementoSolidario, acuerdo2019, falloCaja
    }

    res.render("result", data);

    
    
    }
    if(req.body.jornadaH == "part-120"){
      sueldoBasico=hsPartTime*120;
      let saldoHsAdicionalPart= hsAdicionalesPart*hsPartTime;

      incrementoSolidario=2500;
      acuerdo2019=625;

      console.log("la hora del part es "+hsPartTime)
      console.log("el basico del part 120 es"+sueldoBasico)
      presentismo=0;
      presentismo=(sueldoBasico+saldoApagarHsDom+saldoApagarHsFeriado+saldoHsAdicionalPart)*0.083

      sueldoHaberConDesc= sueldoBasico+saldoApagarHsFeriado+saldoApagarHsDom+presentismo+acuerdo2019+incrementoSolidario+saldoHsAdicionalPart;



    let jubilacion=0.11*sueldoHaberConDesc
    let ley19032=0.03*sueldoHaberConDesc
    let sindicatoAgec=0.025*sueldoHaberConDesc;
    let obraSocial=0.03*sueldoHaberConDesc;
    let anssal=0.0054*sueldoHaberConDesc;


    let descuentos = jubilacion+ley19032+anssal+obraSocial+sindicatoAgec;

    let falloCaja= (sueldoBasico*3361.9)/sueldoConAntiguedad

    let sueldoNeto= sueldoHaberConDesc-descuentos+falloCaja;

    
   

    console.log(sueldoConAntiguedad)
    console.log(sueldoNeto)
    console.log(saldoApagarHsDom)
    console.log(saldoApagarHsFeriado)
    console.log(presentismo)
    console.log("estas en part 120")

    const data = {
      sueldoBasico, sueldoConAntiguedad, sueldoNeto, saldoApagarHsDom, saldoApagarHsFeriado, presentismo, jubilacion, anssal, ley19032, obraSocial, sindicatoAgec, saldoHsAdicionalPart, incrementoSolidario, acuerdo2019, falloCaja
    }

    res.render("result", data);
 

   


    }
    else{

    presentismo=(sueldoConAntiguedad+saldoApagarHsDom+saldoApagarHsFeriado)*0.083

    incrementoSolidario=4000;
    acuerdo2019=2000;

    let sueldoHaberConDesc= sueldoConAntiguedad+saldoApagarHsFeriado+saldoApagarHsDom+presentismo+acuerdo2019+incrementoSolidario;

    sueldoBasico=sueldoConAntiguedad;



     jubilacion=0.11*sueldoHaberConDesc
     ley19032=0.03*sueldoHaberConDesc
    sindicatoAgec=0.025*sueldoHaberConDesc;
     obraSocial=0.0255*sueldoHaberConDesc;
     anssal=0.0045*sueldoHaberConDesc;


    let descuentos = jubilacion+ley19032+anssal+obraSocial+sindicatoAgec;

    let falloCaja=3361.9;
     sueldoNeto = sueldoHaberConDesc-descuentos+falloCaja;
    
 

    

  console.log(sueldoConAntiguedad)
 console.log(sueldoNeto)
 console.log(saldoApagarHsDom)
 console.log(saldoApagarHsFeriado)
 console.log(presentismo)
 console.log("estas en full")
 }


 

 

 
const data = {
      sueldoBasico,sueldoConAntiguedad, sueldoNeto, saldoApagarHsDom, saldoApagarHsFeriado, presentismo, jubilacion, anssal, ley19032, obraSocial, sindicatoAgec, saldoHsAdicionalPart, incrementoSolidario, acuerdo2019, falloCaja
    }

    res.render("result", data);
 
    //jubilacion=undefined;
    //delete(jubilacion);

    //anssal=undefined;
    //delete(anssal);

    //ley19032=undefined;
    //delete(ley19032);

    //obraSocial=undefined;
    //delete(obraSocial);
    
    //sindicatoAgec=undefined;
    //delete(sindicatoAgec);
    
    //sueldoNeto=undefined;
    //delete(sueldoNeto);

})




let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}



app.listen(port, function() {
  console.log("Server started on port 3000");
});

