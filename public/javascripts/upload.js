$('#btnSubmit').click(function(event) {
    event.preventDefault();
    var form = document.forms.uploadForm;

    var formData = new FormData(form);
    var campaignFormData = new FormData();
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
        campaignFormData.append(pair[0], pair[1]);
    }
    console.warn(formData instanceof FormData);
    // data = {
    //     campaign : {
    //         name : 'ma campaign'
    //     }, upload : formData

    // };
    // data.form = formData;
    $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful!');
        }
    });
});