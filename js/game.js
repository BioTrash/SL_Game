/* Rufus Trukhin rutr7079 */
document.addEventListener("DOMContentLoaded", function(){ //Needed for src to be in head    
    $(document).ready(function() { //Needed for jquery
        let enemyHealth = $('#currentHealth').css('width');
        let parentWidth = $('#currentHealth').parent().width();

        let timeLeft = $('#timeLeft').css('width');
        let timeWidth = $('#timeLeft').parent().width();

        let riksdaler = 1000;
        let wood = 0;
        let metal = 0;
        let mine = 0;
        let lumber = 0;
        let trade = 0;
        let army = 0;
        let fleet = 0;
        let merc = 0;

        let percentage = (parseFloat(enemyHealth) / parentWidth) * 100.0;
        let time = (parseFloat(timeLeft) / timeWidth) * 100.0;

        function setHealth(modHealth){
            $('#currentHealth').css('width', (percentage -= modHealth) + '%');
        }
        
        $("#enemy").click(function(){
            setHealth(.001);
            riksdaler += 100; 
          });
          
        setInterval(function(){

            wood += lumber * (0.66);
            $('#lumber').text("Trä: " + wood.toFixed(0));

            metal += mine * (0.5);
            $('#metals').text("Metall: " + metal.toFixed(0));

            riksdaler += (lumber * 0.33 + mine * 0.5) * (trade + 1 + fleet*0.2);
            $('#riksdaler').text("Riksdaler: " + riksdaler.toFixed(0));

            setHealth((army + merc) * 0.002 + fleet * 0.001);

            $('#timeLeft').css('width', (time -= 0.05) + '%');
            
        }, 100);  

        function checkPrice(type){
            switch(type){
                case "lumber":
                    return 900 + lumber * lumber;
                    break;
                case "mine":
                    return 2000 + mine * mine;
                    break;
                case "trade":
                    return 10000 + trade * trade * trade * trade;
                    break;
                case "army":
                    return 400 + army * army;
                    break;
                case "fleet":
                    return 3000 + fleet * fleet;
                    break;
                case "merc":
                    return 10000 + merc * merc;
                    break;
            }
        }


        $("#topLeft").click(function(){ //lumber
            if(riksdaler >= checkPrice("lumber")){
                lumber++;
                riksdaler -= checkPrice("lumber");
            }
        });

        $("#middleLeft").click(function(){ //mine
            if(riksdaler >= checkPrice("mine")){
                mine++;
                riksdaler -= checkPrice("mine");
            }
        });

        $("#bottomLeft").click(function(){ //trade
            if(riksdaler >= checkPrice("trade")){
                trade++;
                riksdaler -= checkPrice("trade");
            }
        });

        $("#topRight").click(function(){ //army
            if(riksdaler >= checkPrice("army")){
                army++;
                riksdaler -= checkPrice("army");
            }
        });

        $("#middleRight").click(function(){ //fleet
            if(riksdaler >= checkPrice("fleet")){
                fleet++;
                riksdaler -= checkPrice("fleet");
            }
        });

        $("#bottomRight").click(function(){ //merc
            if(riksdaler >= checkPrice("merc")){
                merc++;
                riksdaler -= checkPrice("merc");
            }
        });

        $("#confirm").click(function(){
            $("#invisible").hide();
        });
    });
}); 