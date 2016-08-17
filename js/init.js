$(function(){
$("#form").validate({ // your form id (you can also use class name instead id)
rules: {
name: {
required: true, // makes the element always required
minlength: 3 // makes the element require a given minimum length
},
company: {
required: true
},
phone: {
required: true,
number: true, // makes the element require a decimal number
minlength: 6
},
email: {
required: true,
email: true // makes the element require a valid email
},
message: {
required: true
}
},
messages: { // specify custom messages
name: {
required: 'This field is required',
minlength: 'Minimum length: 3'
},
company: {
required: 'This field is required',
},
phone: {
required: 'This field is required',
number: 'Invalid phone number',
minlength: 'Minimum length: 6'
},
email: 'Invalid e-mail address',
message: {
required: 'This field is required'
}
},
success: function(label) {
// set 'ok' class to error-labels to indicate valid fields and call fadeOut() function after 2000ms
label.html('OK').removeClass('error').addClass('ok');
setTimeout(function(){
label.fadeOut(500);
}, 2000)
}
});
});
