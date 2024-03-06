/* Rufus Trukhin rutr7079 */
document.addEventListener("DOMContentLoaded", function(){ //Needed for src to be in head    
    $(document).ready(function() { //Needed for jquery
        let enemyHealth = $('#currentHealth').css('width');
        let parentWidth = $('#currentHealth').parent().width();

        let percentage = (parseFloat(enemyHealth) / parentWidth) * 100.0;

        function setHealth(modHealth){
            $('#currentHealth').css('width', (percentage -= modHealth) + '%');
        }
        
        $("#enemy").click(function(){
            setHealth(.1);
          });
          

        $("#topLeft").click(function(){
            setInterval(function(){
                setHealth(.1);
            }, 100);     
          });

        $("#confirm").click(function(){
            $("#invisible").hide();
        });
    });
}); 