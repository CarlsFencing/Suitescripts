/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/ui/serverWidget', 'N/search'], function(record, serverWidget, search) {


    function beforeLoad(context) {
        if (context.type === context.UserEventType.VIEW) {
            try{

                var form = context.form;
                var RecordId = context.newRecord.id;
                var newRecord = context.newRecord;

                var paymentsMade = newRecord.getValue({fieldId: 'custbody__gc_current_dep_made'})
                var recordTotal = newRecord.getValue({fieldId: 'total'});

                log.debug(recordTotal, typeof(paymentsMade))


                var total = newRecord.getValue({ fieldId: 'total' });
                var percentage = (paymentsMade / total) * 100;
                var onePennieOffBelow = sumAllPayments-.01;
                var onePennieOffAbove = sumAllPayments+.01;
                var width;
                var color;
                var background;

                

                if (sumAllPayments <= 0) {
                    width = '0%';
                    color = '#000';
                    background = '#c5c5c5'; //grey
                }else if(total === onePennieOffAbove || total === onePennieOffBelow) {
                    width = '100%';
                    color = '#fff';
                    background = '#25be13'; //green
                }else if (sumAllPayments > 0 && sumAllPayments < total) {
                    width = percentage.toFixed(1) + '%';
                    color = '#fff';
                    background = '#0e90d2'; //blue
                }else {
                    width = '100%';
                    color = '#fff';
                    background = '#25be13'; //green
                }

                
      

                form.addField({
                    id: 'custpage_gc_loading_bar',
                    type: serverWidget.FieldType.INLINEHTML,
                    label: 'PAYMENT STATUS'
                }).defaultValue = '<script type="text/javascript">' +
                    "var paymentStatus = document.getElementsByClassName('uir-additional-links')[0]; paymentStatus.style.cursor = 'pointer';paymentStatus.style.display = 'flex';paymentStatus.style.flexDirection = 'row';" +
                    "var div = document.createElement('div');  var bar = document.createElement('div'); div.style.width = '350px'; div.style.padding = '10px'; div.style.marginLeft = '20px'; bar.style.width = '325px'; bar.style.background = '#c5c5c5';" +
                    "div.appendChild(bar); bar.classList.add('pay-bar'); var currentStatus = document.createElement('div'); bar.appendChild(currentStatus); currentStatus.style.width = '"+width+"'; currentStatus.style.background = '"+background+"'; currentStatus.innerText = '"+width+"'; " +
                    "currentStatus.style.color = '"+color+"';currentStatus.style.fontWeight  ='700'; currentStatus.style.padding = '6px';currentStatus.style.fontSize = '.75em';paymentStatus.appendChild(div);" +
                    "paymentStatus.onclick = function(){window.open('https://533330.app.netsuite.com/app/common/search/searchresults.nl?searchtype=Transaction&Transaction_CREATEDFROM="+RecordId+"&style=NORMAL&report=&grid=&searchid=4997&dle=T&sortcol=Transction_ORDTYPE9_raw&sortdir=ASC&csv=HTML&OfficeXML=F&pdf=&size=50&_csrf=bi7a3vHESaO64D1imFTaRI2u8I9gv2a0NEsglWvkvDrtcYcOWHDfvybsnEPvgerlxm0pM0YSBVEINtj3Z77hOsJFH6vlE0VRSwLV9oknT6erowRGeAVgDDUW4VoInQM4DJQiky9xMffSfVnyd-kkVjmhaNGRs8EJEmWEyoaPia8%3D&twbx=F', '_blank').focus();}"+

                '</script>'+

                '<style>'+

                '.pay-bar:hover { box-shadow: 10px 10px 17px -6px rgba(0,0,0,0.75); transition-duration: 100ms; }'+

                '</style>';



            }catch(e){
                log.debug('error', e)
            }
        } 
   
    }

    return {
        beforeLoad: beforeLoad
    };
});
