const DASHBOARD_CONFIG = {
    title: "Analisis Risiko Conveyor Bagging PT. ABC",
    author: "Yusril Alfafa",
    failureData: [
        { rank: 1, code: "A2", component: "Gearbox", mode: "Mesin mati mendadak (Overload/Wear)", s: 10, o: 2, d: 5, rpn: 100, rpnRank: 3, cci: 0.7219 },
        { rank: 2, code: "A6", component: "Bearing", mode: "Bearing pecah / pelumas mengering", s: 5, o: 5, d: 5, rpn: 125, rpnRank: 2, cci: 0.6891 },
        { rank: 3, code: "A4", component: "Belt Conveyor", mode: "Sabuk slip / permukaan aus", s: 7, o: 5, d: 2, rpn: 70, rpnRank: 6, cci: 0.3109 },
        { rank: 4, code: "A3", component: "Photo Sensor", mode: "Sensor gagal mendeteksi karung", s: 7, o: 6, d: 2, rpn: 84, rpnRank: 4, cci: 0.2781 },
        { rank: 5, code: "A1", component: "Drive & Tail Pulley", mode: "Putaran roller seret/macet", s: 6, o: 7, d: 4, rpn: 168, rpnRank: 1, cci: 0.1533 },
        { rank: 6, code: "A5", component: "Sprocket", mode: "Rantai kendor / melompat", s: 6, o: 4, d: 3, rpn: 72, rpnRank: 5, cci: 0.1533 }
    ],
    ahpWeights: {
        labels: ["Severity (S)", "Occurrence (O)", "Detection (D)"],
        weights: [0.63138, 0.26179, 0.10683]
    }
};
