var server = "http://192.168.1.203/jayaamweb/public/";
var photoPath = "";
 $groupimage="";
$(function() {
    // process planner 
    $(document).on('change', '#ppjob', function(event) {
        event.preventDefault();
        data ='id='+$(this).val();
        $.post(server+'client',data,function(data){
            $('#process_party_name').html(data);
        });
        return false;
    });
    //Vehicle in form submit
    //alert("Check Jquery");
    $(document).on('submit', '#vehiclein', function(event) {
        event.preventDefault();
        var data = $('#vehiclein').serialize();
        console.log("data: " + data);
        $.post(server + 'receipt', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });

    //$('#vehicle_in').val(jQuery.now());
    //unloading form in submit
    $(document).on('submit', '#unloading', function(event) {
        event.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.post(server + 'materials', data, function(result) {
            alert(result);
             //$('#unloading').get(0).reset();
        });
        return false;
    });

    //Vehicle Out form submit
    $(document).on('submit', '#vehicleOut', function(event) {
        event.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.post(server + 'vehicleout', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });

    //Update job_code
    $(document).on('change', '#vehicle_regno', function() {
        $('#job_code').html($(this).val());
        $('#unload_job').val($(this).val());
    });

    //Unloading quantity change
    $(document).on('change', ".qty", function() {
        quantity = $(this).val();
        var rej = $(this).closest("tr").find(".rej").val();
        var accepted = quantity - rej;
        if (accepted < 0) {
            alert("Mismatch in quantity or rejected");
        } else {
            $(this).closest("tr").find("td:last").html(accepted);
        }
    });
    //Unloading rejected change
    $(document).on('change', ".rej", function() {
        rej = $(this).val();
        var quantity = $(this).closest("tr").find(".qty").val();
        var accepted = quantity - rej;
        if (accepted < 0) {
            alert("Mismatch in quantity or rejected");
        } else {
           // $(this).closest("tr").find("td:last").html(accepted);
        }
    });
    //To add new rows
    $(document).on('click', "#addItem", function() {

        var row = '<tr><td><input type="text" name="material_type[]"></td> <td><input type="text" name="material_structure[]"></td> <td><input type="text" name="material_dimension[]"></td><td><input type="text" class="qty" name="quantity[]"></td><td><input type="text"  name="lot_no[]"></td><td><input type="text" class="rej" name="rejected[]"></td><td></td></tr>';
        $("#unloading_table tr:last").after(row);

    });
    //To add new rows in uploading
    $(document).on('click', "#addItemupload", function() {

        var row = '<tr><td><input type="text" name="material_type[]"></td> <td><input type="text" name="material_structure[]"></td> <td><input type="text" name="material_dimension[]"></td><td><input type="text"  name="quantity[]"></td><td><input type="text"  name="lot_no[]"></td></tr>';
        $("#unloading_table tr:last").after(row);

    });
    //Camera Access & Store
    $(document).on("click",".btn_camera",function(){accessCamera();});

    //--------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Binding
    //lot populate
    $(document).on('change', '#job_code', function() {
        $.get(server + 'bindlotpopulate/' + $(this).val(), function(result) {
            $('#lot_no').html(result);
        });
    });

    //Binding form submit
    $(document).on('submit', '#binding', function(event) {
        event.preventDefault();
        var data = $('#binding').serialize();
        console.log("data: " + data);

        $.post(server + 'processinsert', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });

    //Approve process
    $(document).on('click', '.approve', function(event) {
        if (confirm("Are you sure you want to approve?")) {
        event.preventDefault();
        var self = this;
        var data = "status="+$(this).attr('status')+"&pid="+$(this).attr('pid');
        console.log("data: " + data);
        $.post(server + 'processapproval', data, function(result) {
            alert(result);
            // alert($(self).val());
            $(self).parent().hide();
        });
    }
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //Degreasing form submit
    $(document).on('submit', '#degreasing', function(event) {
        event.preventDefault();
        var data = $('#degreasing').serialize();
        console.log("data: " + data);
        $.post(server + 'degreaseinsert', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //Pickling form submit
    $(document).on('submit', '#pickling', function(event) {
        event.preventDefault();
        var data = $('#pickling').serialize();
        console.log("pick: " + data);
        $.post(server + 'picklinginsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //Rinsing form submit
    $(document).on('submit', '#rinsing', function(event) {
        event.preventDefault();
        var data = $('#rinsing').serialize();
        console.log("data: " + data);
        $.post(server + 'rinsinginsertprocess', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //FLuxing form submit
    $(document).on('submit', '#fluxing', function(event) {
        event.preventDefault();
        var data = $('#fluxing').serialize();
        console.log("data: " + data);
        $.post(server + 'fluxinginsertprocess', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //Drying form submit
    $(document).on('submit', '#drying', function(event) {
        event.preventDefault();
        var data = $('#drying').serialize();
        console.log("data: " + data);
        $.post(server + 'dryinginsertprocess', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //Galvanizing form submit
    $(document).on('submit', '#galvanizing', function(event) {
        event.preventDefault();
        var data = $('#galvanizing').serialize();
        console.log("data: " + data);
        $.post(server + 'galvanizeinsertprocess', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });
    //-------------------------------------------------------------------------------------------------
    //Quenching form submit
    $(document).on('submit', '#quenching', function(event) {
        event.preventDefault();
        var data = $('#quenching').serialize();
        console.log("data: " + data);
        $.post(server + 'quenchinginsertprocess', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });
     //-------------------------------------------------------------------------------------------------
    //Passivation form submit
    $(document).on('submit', '#passivation', function(event) {
        event.preventDefault();
        var data = $('#passivation').serialize();
        console.log("data: " + data);
        $.post(server + 'passivationinsertprocess', data, function(result) {
            alert(result);
        });
        $(this).get(0).reset();
        return false;
    });

    
      
 //Degreasing lab form submit
    $(document).on('submit', '#degreasinglab', function(event) {

        event.preventDefault();
        var data = $('#degreasinglab').serialize();
        $.post(server + 'labinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
     //Pickling lab form submit
     $(document).on('submit', '#picklinglab', function(event) {
        event.preventDefault();
        var data = $('#picklinglab').serialize();
        $.post(server + 'picklinglabinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
      //Rinsing lab form submit
      $(document).on('submit', '#rinsinglab', function(event) {
        event.preventDefault();
        var data = $('#rinsinglab').serialize();
        $.post(server + 'rinsinglabinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
     //Pre-Flux lab form submit
     $(document).on('submit', '#prefluxlab', function(event) {

        event.preventDefault();
        var data = $('#prefluxlab').serialize();
        console.log("data: " + data);
        $.post(server + 'labinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
     //Hot Plate lab form submit
     $(document).on('submit', '#hotplatelab', function(event) {

        event.preventDefault();
        var data = $('#hotplatelab').serialize();
        console.log("data: " + data);
        $.post(server + 'labinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
    //Zinc Tab lab form submit
    $(document).on('submit', '#zinctablab', function(event) {

        event.preventDefault();
        var data = $('#zinctablab').serialize();
        console.log("data: " + data);
        $.post(server + 'labinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
      //Quenching lab form submit
      $(document).on('submit', '#quenchinglab', function(event) {

        event.preventDefault();
        var data = $('#quenchinglab').serialize();
        console.log("data: " + data);
        $.post(server + 'labinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
      //Dichromating lab form submit
      $(document).on('submit', '#dichromatinglab', function(event) {

        event.preventDefault();
        var data = $('#dichromatinglab').serialize();
        console.log("data: " + data);
        $.post(server + 'labinsert', data, function(result) {
            alert(result);
        });
         $(this).get(0).reset();
        return false;
    });
      //Recovery log form submit
      $(document).on('submit', '#recoveryloginsert', function(event) {

        event.preventDefault();
        var micr="";
        $(".micr").each(function(){
            if($(this).val() !="")
                micr += $(this).val()+",";
        });
        var data = $('#recoveryloginsert').serialize()+"&microns="+micr;
        console.log("data: " + data);
        $.post(server + 'recoveryloginsert', encodeURI(data), function(result) {
            alert(result);
        });
        return false;
    });
      //Inspection form submit
      $(document).on('submit', '#inspectform', function(event) {

        event.preventDefault();
        var micr="";
        $(".insmicro").each(function(){
            if($(this).val() !="")
                micr += $(this).val()+",";
        });
        var data = $(this).serialize()+"&elco_microns="+micr;
        console.log("data: " + data);
        $.post(server + 'inspect', encodeURI(data), function(result) {
            alert(result);
            $('#inspectform input[type=text]').addClass('trans');
        });
        return false;
    });
     //Degreasing tank details
     $(document).on('change', '#facility_dgr', function() {
        var data = "id="+$(this).val();
        $.post(server + 'degreasingtank', data, function(result) {
            $("#dgr_status").html(result);
        });
        
    });
      //Pickling tank details
      $(document).on('change', '#facility_pck', function() {
        //alert('Jimmy');
        var data = "id="+$(this).val();
        $.post(server + 'picklingtank', data, function(result) {
            $("#pck_status").html(result);
        });
        
    });
      //Rinsing tank details
      $(document).on('change', '#facility_rns', function() {
        var data = "id="+$(this).val();
        $.post(server + 'rinsingtank', data, function(result) {
            $("#rns_status").html(result);
        });
        
    });
      //Fluxing tank details
      $(document).on('change', '#facility_flx', function() {
        var data = "id="+$(this).val();
        $.post(server + 'fluxingtank', data, function(result) {
            $("#flx_status").html(result);
        });
    });
         //Drying tank details
         $(document).on('change', '#facility_dry', function() {
            var data = "id="+$(this).val();
            $.post(server + 'dryingtank', data, function(result) {
                $("#dry_status").html(result);
            });
        });
         //Galvanizing tank details
         $(document).on('change', '#facility_gal', function() {
            var data = "id="+$(this).val();
            $.post(server + 'galvanizingtank', data, function(result) {
                $("#gal_status").html(result);
            });
        });
         //Quenching tank details
         $(document).on('change', '#facility_que', function() {
            var data = "id="+$(this).val();
            $.post(server + 'quenchingtank', data, function(result) {
                $("#que_status").html(result);
            });
        });
         //Galvanization process plan details
         $(document).on('change', '#galjobcode', function() {
            var data = "galjobcode="+$(this).val();
            $.post(server + 'galplan', data, function(result) {
                $("#gal_plan").html(result);
            });
        });
         //Passivation tank details
         $(document).on('change', '#facility_pas', function() {
            var data = "id="+$(this).val();
            $.post(server + 'passivationtank', data, function(result) {
                $("#pas_status").html(result);
            });

        });

         //Stage reverse process
         $(document).on('change', '.rev_stage', function() {
            var self = this;
            if (confirm("Are you sure you want to go back to the previous stage?")) {
           var data = "status="+$(this).val()+"&pid="+$(this).attr('pid');
           console.log(data); 
           $.post(server + 'stagereverse', data, function(result) {
               alert(result);
                $(self).parent().hide();
               
            });
          


       }
       return false;
         });
//----------------------------------------------------------------------------------------------
//Process planner
//Update job_code
    // $(document).on('change', '#', function() {
    //     $('#job_code').html($(this).val());
    //     $('#unload_job').val($(this).val());
    // });
   // ------------------------------------------------------------------------------------------
   //Process Planner form submit
    $(document).on('submit', '#process_planner', function(event) {
        event.preventDefault();
        var data = $(this).serialize();
        console.log("data: " + data);
        $.post(server + 'plan', data, function(result) {
            alert(result);
        });
        
        return false;
    });
// ------------------------------------------------------------------------------------------

//unbinding form in submit
    $(document).on('submit', '#unbinding', function(event) {
        event.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.post(server + 'unbindinginsertprocess', data, function(result) {
            alert(result);
            $('#unbinding').get(0).reset();
        });
         
        return false;
    });
    //Cleaning form in submit
    $(document).on('submit', '#cleaning', function(event) {
        event.preventDefault();
        var data = $(this).serialize();
        console.log(data);
        $.post(server + 'cleaninginsertprocess', data, function(result) {
            alert(result);
            $('#cleaning').get(0).reset();
        });
         
        return false;
    });

     });



 


 
                    

               



function vhno() {

    $.get(server + 'unloading', function(result) {
        $('#vehicle_regno').html(result);

    });
}

function jobpopulate() {
    $.get(server + 'bindjobpopulate', function(result) {
        $('#job_code').html(result);
        for (i = 1; i <= 20; i++) {

            $('#jig option:last').after("<option value='" + i + "'>" + i + "</option>");
        }

    });


}

function bindapprove() {
    $.get(server + 'bndapprovelist', function(result) {
        //alert("approve");
        $('#approvelabel').html(result);
    });
}

function dgrjigpopulate() {
    $.get(server + 'degreasejigpopulate', function(result) {
        $('#pid').html(result);
       

    });

}

function degreaseapprove() {
    $.get(server + 'dgrapprovelist', function(result) {
        //alert("approve");
        $('#dgrapprovelabel').html(result);
    });
}


function pckjigpopulate() {
    $.get(server + 'picklingjigpopulate', function(result) {
        $('#pid').html(result);
       

    });

}

function pickleapprove() {
    $.get(server + 'pckapprovelist', function(result) {
        //alert("approve");
        $('#pckapprovelabel').html(result);
    });
}

function rnsjigpopulate() {
    $.get(server + 'rinsingjigpopulate', function(result) {
        $('#pid').html(result);

       

    });

}

function rinseapprove() {
    $.get(server + 'rnsapprovelist', function(result) {
        //alert("approve");
        $('#rnsapprovelabel').html(result);
    });
}

function flxjigpopulate() {
    $.get(server + 'fluxingjigpopulate', function(result) {
        $('#pid').html(result);
       

    });

}

function fluxapprove() {
    $.get(server + 'flxapprovelist', function(result) {
        //alert("approve");
        $('#flxapprovelabel').html(result);
    });
}


function dryjigpopulate() {
    $.get(server + 'dryingjigpopulate', function(result) {
        $('#pid').html(result);
       

    });

}

function dryapprove() {
    $.get(server + 'dryapprovelist', function(result) {
        //alert("approve");
        $('#dryapprovelabel').html(result);
    });
}
function glvjobpopulate() {

  $.get(server + 'galvanizejobpopulate', function(result) {
        $('#galjobcode').html(result);
    });
}
function glvjigpopulate() {
    $.get(server + 'galvanizejigpopulate', function(result) {
        $('#pid').html(result);
        $('#gal_img').empty();   

    });

}

function galvanizeapprove() {
    $.get(server + 'glvapprovelist', function(result) {
        //alert("approve");
        $('#glvapprovelabel').html(result);
    });
}


function quejigpopulate() {
    $.get(server + 'quenchingjigpopulate', function(result) {
        $('#pid').html(result);
       

    });

}

function quenchapprove() {
    $.get(server + 'queapprovelist', function(result) {
        //alert("approve");
        $('#queapprovelabel').html(result);
    });
}


function pasjigpopulate() {
    $.get(server + 'passivationjigpopulate', function(result) {
        $('#pid').html(result);
       
    });

}

function passiveapprove() {
    $.get(server + 'pasapprovelist', function(result) {
        //alert("approve");
        $('#pasapprovelabel').html(result);
    });
}

function uploadfile(filepath){

        var win = function (r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    var fail = function (error) {
        alert("Capture cancelled");
        //alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    } 
        
        var options = new FileUploadOptions();
            $filename=filepath.substr(filepath.lastIndexOf('/') + 1)
            options.fileKey="file";
            options.fileName=$filename;
            options.mimeType="image/jpeg";
            var ft = new FileTransfer();
            ft.upload(filepath, encodeURI(server +"photoupload"), win, fail, options);
           $groupimage+=$filename+",";
            $(".imagehidden").val($groupimage);
            alert('Capture success');

          
}

function camSuccess(imgData){
    uploadfile(imgData);
    $("#gal_img").append('<img src="'+imgData+'">');
    console.log(imgData);
     
}

function camError(error){
    alert("Camera Error");
}

function accessCamera(){
    var options={
        destinationType:Camera.DestinationType.FILE_URI,
        sourceType:Camera.PictureSourceType.CAMERA
    };
    navigator.camera.getPicture(camSuccess,camError,options);
  
}


function passiveapprove() {
    $.get(server + 'pasapprovelist', function(result) {
        //alert("approve");
        $('#pasapprovelabel').html(result);
    });
}
function recoveryjobpopulate() {
    $.get(server + 'recoveryjobcode', function(result) {
        $('#jobcodepopulate').html(result);


    });

}
function unbindingjigpopulate()
 {
    //alert("Under Construction");
    $.get(server + 'unbindingjigpopulate', function(result) {
        $('#unbjigpopulate').html(result);


    });

}
function unbindingapprove() {
    //alert("Under Construction");
    $.get(server + 'ubnapprovelist', function(result) {
        $('#unbapprovelabel').html(result);
    });


}
function cleaningjigpopulate()
 {
    //alert("Under Construction jig populate");
    $.get(server + 'cleaningjigpopulate', function(result) {
        $('#clnjigpopulate').html(result);


    });

}
function cleaningapprove() {
   // alert("Under Construction");
    $.get(server + 'clnapprovelist', function(result) {
        $('#clnapprovelabel').html(result);
    });


}
function datetime()
{

    

 $.get(server + 'unloading', function(result) {
        $('#vehicle_in').val(Date());

    });
    
       
}
function processjobpopulate()
{
    // alert("Construction");
    $.get(server + 'planjobpopulate', function(result) {
        $("#ppjob").html(result);
    });
}
function uploadjobpopulate() {
    $.get(server + 'uploadjobpopulate', function(result) {
        $('#upload_jobcode').html(result);
       

    });

}