//Global variables
stdDevBelow = 0.8;
stdDevAbove = 1;
CountAbove = 1;
CountBelow = 1;

//On Button Click, set layer to show standard deviations one above.
$('#StdDevAddButt').click(function(){
    CountBelow = CountBelow + 1;
    stdDevBelow = stdDevBelow - 0.2;
    setMap(stdDevBelow,stdDevAbove,CountBelow,CountAbove);
});

//Or One below!
$('#StdDevSubButt').click(function(){
  if (CountBelow > 1){
    CountBelow = CountBelow - 1;
    stdDevBelow = stdDevBelow + 0.2;
    setMap(stdDevBelow,stdDevAbove,CountBelow,CountAbove);
  }
});
//Function for setting the map
var setMap = function(intervalNumBelow,intervalNumAbove,DevNum,DevNum2){
  $("#LowerNum").text(DevNum);
  $("#UpperNum").text(DevNum2);
  IncLayer.setSQL("SELECT * FROM counties_with_income_normalized_by_state_income WHERE(normalized >  " + intervalNumAbove + " OR normalized < " + intervalNumBelow + ")");
};

$('#StdDevAddUp').click(function(){
    CountAbove = CountAbove + 1;
    stdDevAbove = stdDevAbove + 0.2;
    setMap(stdDevBelow,stdDevAbove,CountBelow,CountAbove);
});

$('#StdDevSubUp').click(function(){
    if (CountAbove > 1){
    CountAbove = CountAbove - 1;
    stdDevAbove = stdDevAbove - 0.2;
    setMap(stdDevBelow,stdDevAbove,CountBelow,CountAbove);
  }
});
