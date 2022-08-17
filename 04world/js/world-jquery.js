/* $(document).ready(function(){

}); */
$(function () {   //shortcut for the above call
    const arrKontinente = ["Europe", "Asia", "Africa", "North America", "South America", "Oceania", "Antarctica"];
    $.each(arrKontinente, (index, el)=>{
        $('#kontinent').append($('<option>').text(el));
    })
    $('#kontinent').click((el)=>{
        $('<img>').attr({src: 'images/ui-anim_basic_16x16.gif', class: 'image'}).insertAfter('#kontinent')
        $.ajax({
            url: `data/liste-json.php?liste=regionen&suche=${el.target.text}`,
            success: (data)=>{
                $('#stadtinfo, #staedte, #landesinfo, #laender, #region').empty();
                $('#region').append($('<select>').attr({id: 'selectRegion', size: 8})).click((el)=>{
                    $('<img>').attr({src: 'images/ui-anim_basic_16x16.gif', class: 'image'}).appendTo('#region')
                    $.ajax({
                        url: `data/liste-json.php?liste=laender&suche=${el.target.text}`,
                        success: (data)=>{
                            $('#stadtinfo, #staedte, #landesinfo, #laender').empty();
                            $('#laender').append($('<select>').attr({id: 'selectLand', size: 8})).click((el)=>{
                                $('<img>').attr({src: 'images/ui-anim_basic_16x16.gif', class: 'image'}).appendTo('#laender')
                                $.ajax({
                                    url: `data/liste-json.php?liste=staedte&suche=${el.target.text}`,
                                    success: (data)=>{
                                        $('#staedte, #stadtinfo').empty();
                                        $('#staedte').append($('<select>').attr({id: 'selectStadt', size: 8}))
                                        $.each(data.Daten, (i, el)=>{
                                            $('#selectStadt').append($('<option>').val(el.ID).text(el.Name))
                                        })
                                        $('#selectStadt').click((el)=>{
                                            $('<img>').attr({src: 'images/ui-anim_basic_16x16.gif', class: 'image'}).appendTo('#staedte')
                                            $.ajax({
                                                url: `data/liste-json.php?liste=stadtinfo&suche=${el.target.value}`,
                                                success: (data)=>{
                                                    $('#stadtinfo').empty();
                                                    $.each(data.Daten[0], (key, val)=>{
                                                        $('#stadtinfo').append($('<p>').text(key + ': ' + val));
                                                    })
                                                    $('.image').remove();
                                                }
                                            })
                                        })
                                        $('.image').remove();
                                    }
                                })
                                $.ajax({
                                    url: `data/liste-json.php?liste=landesinfo&suche=${el.target.text}`,
                                    success: (data)=>{
                                        $('#landesinfo').empty();
                                        $.each(data.Daten[0], (key, val)=>{
                                            $('#landesinfo').append($('<p>').text(key + ': '+ val));
                                        })
                                    }
                                })
                            })
                            $.each(data.Daten, (i, el)=>{
                                $('#selectLand').append($('<option>').text(el.Land))
                            })
                            $('.image').remove();
                        }
                    })
                })
                $.each(data.Daten, (i, el)=>{
                    $('#selectRegion').append($('<option>').text(el.Region))
                });
                $('.image').remove()                            
            }
        })
    });       
   /*  arrKontinente.forEach(function (el) {
        $('<option>').attr('value', el).text(el).appendTo('#kontinent');
    }) */
});
/* $.ajax({
    url: 'data/liste-json.php',
    data: {
        liste: 'regionen',
        suche: strKontinent
    },
    type: 'POST',
    timeout: 2000
}).done(function (data) {
    console.log(data);
}).fail(function (jqXHR, textStatus) {
    console.log("time out")
}) */