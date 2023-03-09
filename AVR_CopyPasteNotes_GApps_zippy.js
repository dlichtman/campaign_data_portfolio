//GApps Copy Paste notes for AVR  fast version
//David Lichtman

//modification of https://www.youtube.com/watch?v=5sK5mngU2Ho and https://gist.github.com/palumbo/e47839bcdb7a484d50a7c6e36c861928

//Gsheet link : https://docs.google.com/spreadsheets/d/17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA/

function moveRows() {

  const source = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('Source');

  const Region01 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R01');

  const Region02 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R02');

  const Region03 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R03');

  const Region04 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R04');

  const Region05 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R05');

  const Region06 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R06');

  const Region07 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R07');

  const Region08 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R08');

  const Region09 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R09');

  const Region10 = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('R10');

  const Unturfed = SpreadsheetApp.openById('17EoAz0o0vzAL06Rul17__tIsTsuoxmix3tTalAfGVRA').getSheetByName('Unturfed');




  //clear existing notes that will be in wrong place after refresh

  Region01.getRange("V2:Y").clearContent()
  Region02.getRange("V2:Y").clearContent()
  Region03.getRange("V2:Y").clearContent()
  Region04.getRange("V2:Y").clearContent()
  Region05.getRange("V2:Y").clearContent()
  Region06.getRange("V2:Y").clearContent()
  Region07.getRange("V2:Y").clearContent()
  Region08.getRange("V2:Y").clearContent()
  Region09.getRange("V2:Y").clearContent()
  Region10.getRange("V2:Y").clearContent()
  Unturfed.getRange("V2:Y").clearContent()



//for source
  let SourceLastRow = source.getLastRow();

  var sortRange = source.getDataRange().getValues();  //variable to represent values of spreadsheet as array

  Logger.log(SourceLastRow)
  Logger.log(typeof(sortRange))
  Logger.log(sortRange.length);

//how many rows in each region's section
  let R01Counter = 1;
  let R02Counter = 1;
  let R03Counter = 1;
  let R04Counter = 1;
  let R05Counter = 1;
  let R06Counter = 1;
  let R07Counter = 1;
  let R08Counter = 1;
  let R09Counter = 1;
  let R10Counter = 1;
  let UnturfedCounter = 1;


//where does the region start in the source sheet
  let R01mainStart=1;
  let R02mainStart=1;
  let R03mainStart=1;
  let R04mainStart=1;
  let R05mainStart=1;
  let R06mainStart=1;
  let R07mainStart=1;
  let R08mainStart=1;
  let R09mainStart=1;
  let R10mainStart=1;
  let UnturfedmainStart=1;





  //find how long each section that needs to be copied is by looping through array
  for (var i = 0; i < sortRange.length; i++) {

      var name = sortRange[i][0]
      console.log(i + " - " + name);

      if (name == "R01 - Northern MI") {
        if(name!=sortRange[i-1][0]) //name change, when name of row doesn't match row above it
        {
          R01mainStart=i+1; //add one because this is needed for Spreadsheet function not array! Array first row: 0, Spreadsheet first row: 1
        }
        R01Counter++; //how many rows match R01
      }

      if (name == "R02 - Western MI") {
        if(name!=sortRange[i-1][0])
        {
          R02mainStart=i+1;
        }
        R02Counter++;
      }

      if (name == "R03 - SW MI") {
        if(name!=sortRange[i-1][0])
        {
          R03mainStart=i+1;
        }
        R03Counter++;
      }

      if (name == "R04 - Mid MI") {
       if(name!=sortRange[i-1][0])
        {
        R04mainStart=i+1;
        }
        R04Counter++;
      }

      if (name == "R05 - Thumb & Tri Cities") {
        if(name!=sortRange[i-1][0])
        {
        R05mainStart=i+1;
        }
        R05Counter++;
      }

      if (name == "R06 - Macomb Co") {
        if(name!=sortRange[i-1][0])
        {
        R06mainStart=i+1;
        }
        R06Counter++;
      }

      if (name == "R07 - Oakland Co") {
        if(name!=sortRange[i-1][0])
        {
        R07mainStart=i+1;
        }
        R07Counter++;
      }

      if (name == "R08 - Washtenaw") {
         if(name!=sortRange[i-1][0])
        {
        R08mainStart=i+1;
        }
        R08Counter++;
      }

      if (name == "R09 - Detroit") {
        if(name!=sortRange[i-1][0])
        {
        R09mainStart=i+1;
        }
        R09Counter++;
      }

      if (name == "R10 - Western Wayne") {
        if(name!=sortRange[i-1][0])
        {
        R10mainStart=i+1;
        }
        R10Counter++;
      }

      if (name == "Unturfed") {
        if(name!=sortRange[i-1][0])
        {
        UnturfedmainStart=i+1;
        }
        UnturfedCounter++;
      }

  };

  //Copy paste values from source to individual region sheets in locations we want to draw from and output to
  //All setValues calls grouped at end
     SourceRange=source.getRange(R01mainStart, 20, R01Counter-1, 4) //(row to start, column to start, how many rows, how many columns)
     rowValues = SourceRange.getValues();
     Region01.getRange(2, 22, R01Counter-1, 4).setValues(rowValues); //thankfully want to paste in same place on each regions sheet
     //start at 2 on region target to not paste over title row
     //have to subtract 1 from Counter as well to not paste row 1 of notes for next sheet below last row of previous sheet

     SourceRange=source.getRange(R02mainStart, 20, R02Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region02.getRange(2, 22, R02Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R03mainStart, 20, R03Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region03.getRange(2, 22, R03Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R04mainStart, 20, R04Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region04.getRange(2, 22, R04Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R05mainStart, 20, R05Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region05.getRange(2, 22, R05Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R06mainStart, 20, R06Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region06.getRange(2, 22, R06Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R07mainStart, 20, R07Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region07.getRange(2, 22, R07Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R08mainStart, 20, R08Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region08.getRange(2, 22, R08Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R09mainStart, 20, R09Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region09.getRange(2, 22, R09Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(R10mainStart, 20, R10Counter-1, 4)
     rowValues = SourceRange.getValues();
     Region10.getRange(2, 22, R10Counter-1, 4).setValues(rowValues);

     SourceRange=source.getRange(UnturfedmainStart, 20, UnturfedCounter-1, 4)
     rowValues = SourceRange.getValues();
     Unturfed.getRange(2, 22, UnturfedCounter-1, 4).setValues(rowValues);


};
