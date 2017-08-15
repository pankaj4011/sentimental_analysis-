 
 function validate() {
            var element1 = document.getElementById('in');
            element1.value = element1.value.replace(/[^a-zA-Z@]+/, '');
            var element2 = document.getElementById('ct');
            element2.value = element2.value.replace(/[^0-9@]+/, '');
}