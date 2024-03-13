/* Rufus Trukhin rutr7079 */
document.addEventListener("DOMContentLoaded", function(){ //Needed for src to be in head    
    $(document).ready(function() { //Needed for jquery
        let enemyHealth = $('#currentHealth').css('width');
        let parentWidth = $('#currentHealth').parent().width();

        let timeLeft = $('#timeLeft').css('width');
        let timeWidth = $('#timeLeft').parent().width();

        let riksdaler = 10000;
        let wood = 5000;
        let metal = 2000;
        let mine = 0;
        let lumber = 0;
        let trade = 0;
        let army = 0;
        let fleet = 0;
        let merc = 0;
        let start = false;

        let percentage = (parseFloat(enemyHealth) / parentWidth) * 100.0;
        let time = (parseFloat(timeLeft) / timeWidth) * 100.0;

        function setHealth(modHealth){
            $('#currentHealth').css('width', (percentage -= modHealth) + '%');
        }

        $("#enemy").click(function(){
            setHealth(.001);

            $('#enemyBorder').css('width', '81vh');
            $('#enemyBorder').css('height', '81vh');

            setTimeout(function(){
                $('#enemyBorder').css('width', '80vh');
                $('#enemyBorder').css('height', '80vh');
            }, 100);

            riksdaler += 100; 
          });

          $("#expoLeft").click(function(){
            $.getJSON("info.json", function(info){
                $("#invisible").show();
                $("#expo").text(info.economy);
            });
        });

        $("#expoRight").click(function(){
            $.getJSON("info.json", function(info){
                $("#invisible").show();
                $("#expo").text(info.warfare);
            });
        });

        function formatNumber(num) {
            if (num >= 1000) {
                return ((num / 1000).toFixed(1)) + 'k';
            } else {
                return num.toFixed(0).toString();
            }
        }
          
        setInterval(function(){

            wood += lumber * (0.66);
            $('#lumber').text(wood.toFixed(0));

            metal += mine * (0.5);
            $('#metals').text(metal.toFixed(0));

            riksdaler += (lumber * 0.33 + mine * 0.5) * (trade + 1 + fleet*0.2);
            $('#riksdaler').text(riksdaler.toFixed(0));

            if(percentage > 0 && time > 0 && start){
                setHealth((army + (merc*2)) * 0.002 + fleet * 0.001);

                $('#timeLeft').css('width', (time -= 0.02) + '%');
                
                $('#currentYear').text("Year " + (1531 - (time.toFixed(0)/10)).toFixed(0));
            }
            else{
                finished();
            }
            
        }, 100);  

        function finished(){
            let rank;
            start = false;
            $("#invisible").show();

            if(time >= 80 && start){
                rank = "Your rank is A! Good job, you've managed to defeat the Union in the historical timeframe!"
            }
            else if(time >= 60 && start){
                rank = "Your rank is B! You've managed to defeat the Union almost as quickly as it was done historically!"
            }
            else if(time >= 40 && start){
                rank = "Your rank is C! While you've managed to defeat the Union you've spent a great deal more time than it was done historically. Hint: Better trading prowess makes your mines and forestry more profitable."
            }
            else if(time >= 20 && start){
                rank = "Your rank is D! You've defeated the Union but it took you much longer than it was done historically. Hint: While expensive, the mercenaries tended to be better equiped than the standing army."
            }
            else if(time <= 0 && start){
                rank = "Your rank is E! You didn't manage to defeat the Union in time, the local nobels overthrew you and invited the Danish monarch back to take the throne. Hint: A strong military is preceded byt a strong economy."
            }

            $("#expo").text(rank)
        }

        function checkPrice(type){
            switch(type){
                case "lumber":
                    return 900 + lumber * lumber;
                    break;
                case "mine":
                    return 2000 + mine * mine * mine * mine;
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
                riksdaler -= checkPrice("lumber");
                lumber++;
                $("#expoTopLeft").text(formatNumber(checkPrice("lumber")));
            }
        });

        $("#middleLeft").click(function(){ //mine
            if(riksdaler >= checkPrice("mine")){
                riksdaler -= checkPrice("mine");
                mine++;
                $("#expoMiddleLeft").text(formatNumber(checkPrice("mine")));
            }
        });

        $("#bottomLeft").click(function(){ //trade
            if(riksdaler >= checkPrice("trade")){
                riksdaler -= checkPrice("trade");
                trade++;
                $("#expoBottomLeft").text(formatNumber(checkPrice("trade")));
            }
        });

        $("#topRight").click(function(){ //army
            if(riksdaler >= checkPrice("army") && metal >= checkPrice("army")/4){
                metal -= checkPrice("army")/4
                riksdaler -= checkPrice("army");
                army++;
                $("#expoTopRight").text(formatNumber(checkPrice("army")));
                $("#expoTopMetal").text(formatNumber(checkPrice("army")/4));
            }
        });

        $("#middleRight").click(function(){ //fleet
            if(riksdaler >= checkPrice("fleet") && wood >= checkPrice("fleet")/2  && metal >= checkPrice("fleet")/6) {
                wood -= checkPrice("fleet")/2
                metal -= checkPrice("fleet")/6
                riksdaler -= checkPrice("fleet");
                fleet++;
                $("#expoMiddleRight").text(formatNumber(checkPrice("fleet")));
                $("#expoMiddleWood").text(formatNumber(checkPrice("fleet")/2));
                $("#expoMiddleMetal").text(formatNumber(checkPrice("fleet")/6));
            }
        });

        $("#bottomRight").click(function(){ //merc
            if(riksdaler >= checkPrice("merc")){
                riksdaler -= checkPrice("merc");
                merc++;
                $("#expoBottomRight").text(formatNumber(checkPrice("merc")));
            }
        });

        $("#confirm").click(function(){
            $("#invisible").hide();
            start = true;
        });
    });
}); 