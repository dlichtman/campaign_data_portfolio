#packet tracker management
#David Lichtman
#11/5/22


import pygsheets
#from google.oauth2 import service_account
import pandas as pd

#list of sls and packet tracker gids

sl_list=[

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
    'Distributed',

]

test_sl_list=[
    'SL0301_BattleCreek',
    'SL0704_RoyalOak'
]

gid_list = [

    ['SL01','1V5BncdNKA-DKA2DXSWSER5gMcze71ExnSw_7f7hM81s']
    ,['SL02','1wGyaSZQgVPEEtIBre9FiZa6mpkIZl24nppyvjefKxi8']
    ,['SL03','1OI-ew-bEVSgVqYGsFHlOVVP1uFZHx18irV7XpIMfRms']
    ,['SL04','1Y-C78qYvAgYvvYJ0PMuoTXhl9qETDNaFODh4yfGXEL0']
    ,['SL05','1FL-a14z4dXYAv2Hb0Cl_KVE_a9KU6yoEulIOT1Z0EwU']
    ,['SL06','1IIos6eHmWEyAdIrV_nk6MbBJXQB7uAiX3I7G6mGcXQ0']
    ,['SL07','1SqH2AwxHMtuziVL5HIMsIp8l65eDo1FQofwsCXvn7C8']
    ,['SL08','18nNkAaUL9C0dijwveQNJKzRtcbmeXtYKempSWVMFAaM']
    ,['SL09','1hWzfRwJ7lxkoT2__TKvZnCXflb_cB1WHaCu--PT9wT8']
    ,['SL10','1SmeYO4SJOqgubUTXONpWJ0htnu1i1BL6Z0dakRB0bpg']
    ,['SL12','1iTLMesiisiJc-_SImYusJA8C0HxODQDEYhXpwIMiOyc']
    ,['Distributed','1ME58Gr0am9r9FKBFRje5cjaNeQpeMLU1m4RKF9SmGLw']
]

test_gid_list=[

    ['SL03','12ZAogGYlSPwG4NF3oBsKkZPX9wiWIzhYHBEa4wCIGdQ']
    ,['SL07','12ZAogGYlSPwG4NF3oBsKkZPX9wiWIzhYHBEa4wCIGdQ']

]


gc=pygsheets.authorize(service_file=r'C:\Users\dlich\Documents\MI Dems Data\turf_cutting_automation\midems-data-robot-d67ea0635727.json')

#read in packet tracker export to df



def read_in_sheets(key, sheet_name):
    sh=gc.open_by_key(key)
    wks=sh.worksheet_by_title(sheet_name)
    df=wks.get_as_df()
    return df


export_key='1kOwv7je4W12UIFLikWlhDJVqBJ9FCaBYC-DUWirHrI4'
export_sheet_name='export'

export_df=read_in_sheets(export_key, export_sheet_name)


#read in notes to df

notes_key='1_VxF8tU7Az5fmTQFz0wW0UD7Pk1yME6CrVD7sVovm_Q'
notes_sheet_name='notes_import'

notes_df=read_in_sheets(notes_key, notes_sheet_name)

#join export and notes

combined_df= export_df.merge(notes_df,on="Turf Name")

#print(combined_df)

#print(combined_df.columns)

combined_df=combined_df.drop(['date_added','Minivan Number','People','Doors','Coalitions','Paid','door_hanger'],axis=1)

print(combined_df.columns)

#TEST print full combined_df to test sheet
try:
    test_key='12ZAogGYlSPwG4NF3oBsKkZPX9wiWIzhYHBEa4wCIGdQ'
    target_sh=gc.open_by_key(test_key)
    target_wks=target_sh.worksheet_by_title('full_joined_export')

    target_wks.clear()
    #target_wks.rows=combined_df.shape[0]

    target_wks.set_dataframe(combined_df,(5,2))
finally:


#loop through joined export/notes and create temp dfs for each sl and write to sl pages

    for sl in test_sl_list:
        #print(sl_combined_df)

        #search for matching keys in gid_list, open appropriate sheet, then open worksheet of sl

        sl_comp=sl[:4]

        for gid in test_gid_list:
            if sl_comp==gid[0]:

                sl_combined_df=combined_df[combined_df.staging_location==sl].sort_values(['priority'])

                sl_key_name=gid

                target_sheet_key=gid[1]

                target_sh=gc.open_by_key(target_sheet_key)
                target_wks=target_sh.worksheet_by_title(sl)
                print(target_sheet_key)
                print(sl)
                print(sl_combined_df)
                target_wks.clear()
                target_wks.set_dataframe(sl_combined_df,(5,2))
