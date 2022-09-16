var group__fsm =
[
    [ "FSM_t", "struct_f_s_m__t.html", [
      [ "BLEgotoConfig", "struct_f_s_m__t.html#a81f5fa449e78d82f0c331aa21fc2d944", null ],
      [ "BLEgotoIdle", "struct_f_s_m__t.html#a85b463cf57882e39dc3f3b99f5d3065d", null ],
      [ "BLEstartMission", "struct_f_s_m__t.html#ac4e8bb5751f91aeed6c393ee49e4ff83", null ],
      [ "hallEffectButton", "struct_f_s_m__t.html#a68680c2f1db5e56603f319cb5e53ea4d", null ],
      [ "IDLEstateTimeout", "struct_f_s_m__t.html#a00af475d8dead83d20b4dc3fa805e72c", null ],
      [ "nextState", "struct_f_s_m__t.html#a77660732f859223dd3a2676bc123e8a5", null ],
      [ "state", "struct_f_s_m__t.html#a19ca450a6e1eb0431417cf685579d30a", null ],
      [ "stateInitialized", "struct_f_s_m__t.html#af3a57a4546b4ec7734c52e5140f3242c", null ]
    ] ],
    [ "systemEvent_t", "group__fsm.html#ga6e874f5cf67502997f315bee2e5e3cce", [
      [ "Initialize", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3cceaec5ffdce78f3f4afd0eb1a361bd1f4fe", null ],
      [ "Init_Finished", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea77b5700914c3241494f26e107f4c53b3", null ],
      [ "HallEffectInterrupt", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea08e332f404052e3b35160df29c31577f", null ],
      [ "BLEInterrupt", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea74a43f58d8fc94d150672eecc093b9f4", null ],
      [ "Failure", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea6fb01c5d76aa5b0825fd3c52dc5f3661", null ],
      [ "MissionStart", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea8c5c49e336080dd3e29eda3031470cca", null ],
      [ "MissionFinished", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea500ab1e01a73e327afaf3e44e62373cc", null ],
      [ "MissionAbort", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3cceaff359820faec8016a50f706a7539f447", null ],
      [ "Sleep", "group__fsm.html#gga6e874f5cf67502997f315bee2e5e3ccea5b382c5c9788ae9f606d475a6709e721", null ]
    ] ],
    [ "systemState_t", "group__fsm.html#ga0f7caaa1b35862fbbaccc5ee6192223f", [
      [ "INIT", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fa0cb1b2c6a7db1f1084886c98909a3f36", null ],
      [ "IDLE", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fafd6a0e4343048b10646dd2976cc5ad18", null ],
      [ "CONFIGURE", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fa5183723f609e1521f38450e9792af61d", null ],
      [ "MISSION", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fae92f6a2bb46918da226bb46c591605c8", null ],
      [ "PICKUP", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fabd6c69691b68642f5c619c8be829d3db", null ],
      [ "SLEEP", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fad6137abebe4fdc59e2f0f2c84bdbe3fa", null ],
      [ "LOWPOWER", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223fa3443484ca1aa8edccfe37956838d8737", null ],
      [ "FAILURE", "group__fsm.html#gga0f7caaa1b35862fbbaccc5ee6192223faa5571864412c8275a2e18a931fddcaa6", null ]
    ] ],
    [ "CONFIGUREstate", "group__fsm.html#ga0942e6f4629df05cbaff6077558f4a78", null ],
    [ "ConfigureStateHandler", "group__fsm.html#ga60dc95d20231bf1575769e26d8450b6c", null ],
    [ "failureHandler", "group__fsm.html#gac8336e3d7a3ef69608fd1a0863d6d386", null ],
    [ "FAILUREstate", "group__fsm.html#ga143ecdff7e4d94cb51ea738bc9639b8c", null ],
    [ "FSM", "group__fsm.html#ga32467ab71fdf32a53080ac7e38a8258e", null ],
    [ "IDLEstate", "group__fsm.html#ga2a06cd47d46eea1776e9706594bed9b0", null ],
    [ "IdleStateHandler", "group__fsm.html#ga8738986c074facb8a0426de179d0f824", null ],
    [ "INITstate", "group__fsm.html#ga2bb5b6bb62465ff9d6d938cebd070867", null ],
    [ "InitStateHandler", "group__fsm.html#ga93f530662fb589decb514ade35f28fe7", null ],
    [ "LowPowerHandler", "group__fsm.html#ga8e38589eac447e6c65f693ebc07f0c46", null ],
    [ "LOWPOWERstate", "group__fsm.html#gaefd2afbda545aaac971c8374fa7a45a6", null ],
    [ "MissionAbortHandler", "group__fsm.html#ga8815c5c1bd70e15accde55cad738ced4", null ],
    [ "MissionFinishedHandler", "group__fsm.html#ga4371ab7c43865c535e33b0c07253ed95", null ],
    [ "MissionStartHandler", "group__fsm.html#ga3d3def576955654b53146785eff47a85", null ],
    [ "MISSIONstate", "group__fsm.html#gadf4b301a07d54482b7b4ae24d667cf2b", null ],
    [ "PICKUPstate", "group__fsm.html#ga47aaa4f154938bec829b6b0c4ea7e44d", null ],
    [ "SleepHandler", "group__fsm.html#ga2b8d0789c3f95128cf950607b9571245", null ],
    [ "SLEEPstate", "group__fsm.html#gaee5b2e0c3e84449e3300f0c6b55f0716", null ],
    [ "waitForEvent", "group__fsm.html#gab34e187a8d58fd9c98b2cb1222aa945e", null ],
    [ "fsm", "group__fsm.html#gaf6eb4790138572cbcfa53c137ddc56e2", null ]
];