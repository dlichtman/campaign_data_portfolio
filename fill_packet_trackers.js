function writeNotestoPacketTrackers() {

 const gidList = [

'1V5BncdNKA-DKA2DXSWSER5gMcze71ExnSw_7f7hM81s',
'1wGyaSZQgVPEEtIBre9FiZa6mpkIZl24nppyvjefKxi8',
'1OI-ew-bEVSgVqYGsFHlOVVP1uFZHx18irV7XpIMfRms',
'1Y-C78qYvAgYvvYJ0PMuoTXhl9qETDNaFODh4yfGXEL0',
'1FL-a14z4dXYAv2Hb0Cl_KVE_a9KU6yoEulIOT1Z0EwU',
'1IIos6eHmWEyAdIrV_nk6MbBJXQB7uAiX3I7G6mGcXQ0',
'1SqH2AwxHMtuziVL5HIMsIp8l65eDo1FQofwsCXvn7C8',
'18nNkAaUL9C0dijwveQNJKzRtcbmeXtYKempSWVMFAaM',
'1hWzfRwJ7lxkoT2__TKvZnCXflb_cB1WHaCu--PT9wT8',
'1SmeYO4SJOqgubUTXONpWJ0htnu1i1BL6Z0dakRB0bpg',
'1iTLMesiisiJc-_SImYusJA8C0HxODQDEYhXpwIMiOyc',
'1ME58Gr0am9r9FKBFRje5cjaNeQpeMLU1m4RKF9SmGLw'

 ]

 var gidList2= ['1hQfYSvGTfsAFQXj3CCPVRjHFKy_9XPuqLoeV9gbpqDs']

 const slList = [

'SL0101_Escanaba',
'SL0102_Gaylord',
'SL0103_Marquette',
'SL0104_Petoskey',
'SL0105_TraverseCity',
'SL0201_GrandRapids',
'SL0202_Holland',
'SL0203_Muskegon',
'SL0204_NorthMuskegonCounty',
'SL0205_WesternKent',
'SL0206_GrandHaven',
'SL0301_BattleCreek',
'SL0302_BentonHarbor',
'SL0303_Kalamazoo',
'SL0401_GrandLedge',
'SL0402_Lansing',
'SL0403_Livingston',
'SL0404_Mt.Pleasant',
'SL0501_Bay',
'SL0502_Flint',
'SL0503_Midland',
'SL0504_Saginaw',
'SL0601_ClintonTwp',
'SL0602_Eastpointe',
'SL0603_Mt.Clemens',
'SL0604_SterlingHeights',
'SL0605_Warren',
'SL0701_Novi',
'SL0702_Oxford',
'SL0703_Pontiac',
'SL0704_RoyalOak',
'SL0705_Southfield',
'SL0706_RochesterHills',
'SL0801_AnnArbor',
'SL0802_Jackson',
'SL0803_Monroe',
'SL0804_Ypsilanti',
'SL0901_Greenfield',
'SL0902_GrossePointe',
'SL0903_Livernois',
'SL0904_Midtown',
'SL1001_Canton',
'SL1002_Dearborn',
'SL1003_Downriver',
'SL1004_Romulus',
'SL1201_Campus_Dearborn',
'SL1202_Campus_GVSU',
'SL1203_Campus_Kalamazoo',
'SL1204_Campus_MSU',
'SL1205_Campus_SVSU',
'SL1206_Campus_UofM',
'Distributed'
 ]

 var slList2=['SL0101_Escanaba','SL0102_Gaylord']


 //loop through print target sheet and read starting line and number of lines into arrays to be joined into arrays of arrays

 print_target=SpreadsheetApp.openById('1_VxF8tU7Az5fmTQFz0wW0UD7Pk1yME6CrVD7sVovm_Q').getSheetByName('notes_join_exp_2');

 print_target_vals=print_target.getRange("A:Y").getValues();

var breakpoints=[] //array to add starting row and number of rows for each SL

var counter=0
var row=1

 for(var k=1; k<print_target_vals.length-1; k++) {

   var sl_name=print_target_vals[k][0]

   counter++
   console.log(k + " " + sl_name + " count: " + counter)


  if(sl_name!=print_target_vals[k+1][0] && k != print_target_vals.length) { //change in sl name


    console.log("change: " + k)

    var points_arr=[sl_name, row+1,counter]  //starting row and number of rows for each SL
    breakpoints.push(points_arr)

    row=k+1 //update row to start of next SL

    counter=0 //update row count to 0
  }

 }

for(var l=0; l<breakpoints.length; l++ ) {
  console.log(breakpoints[l][0]+ " " + breakpoints[l][1] + " " + breakpoints[l][2])
}



  var point_check=0;

  for(var i=0; i<gidList.length; i++) {

    for(var j=0; j<slList.length; j++) {

      //sheet in spreadsheet to paste to
      var current = SpreadsheetApp.openById(gidList[i]).getSheetByName(slList[j]); //uncomment to arm script



      //console.log(current.length)

      if(current != null && slList[j]===breakpoints[point_check][0]) { //sheet exists and has more than 5 rows (for offset)

        //for each slList[j], copy paste notes that correspond to that SL into

        console.log(i + " - " + j + " - " + current + " - " + breakpoints[point_check][0] + " - " + breakpoints[point_check][1]);

        var rows_copy = print_target.getRange(breakpoints[point_check][1],1,breakpoints[point_check][2], 24).getValues() //copy packet data and notes
        //var rows_copy = print_target.getRange(breakpoints[point_check][1],1,breakpoints[point_check][2], 14).getValues() //copy only packet data
        //var rows_copy = print_target.getRange(breakpoints[point_check][1],15,breakpoints[point_check][2], 10).getValues() //copy only notes

        try {

          current.getRange(5,2,breakpoints[point_check][2],24).setValues(rows_copy) //paste packet data and notes
          //current.getRange(5,2,breakpoints[point_check][2],14).setValues(rows_copy) //paste packet data only
          //current.getRange(5,16,breakpoints[point_check][2],10).setValues(rows_copy) //paste notes only

           point_check++ //go to next array to copy
        }

        catch(err) {

          console.log(breakpoints[point_check][0] + " could not be copied")
          point_check++ //go to next array to copy

        }

       // point_check++; //advance through breakpoints list

      }

      //


  }
}

}
