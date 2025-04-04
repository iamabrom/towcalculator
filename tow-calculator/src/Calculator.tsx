/*
 * Tow Calculator | towcalculator.app
 * Copyright (c) 2025 Abrom Douglas III
 * Licensed under the MIT License (see LICENSE file for details).
 */

import React, { useState, useEffect } from "react";

const Calculator = () => {
  // ============================ User Inputs ============================
  const [rvDryWeight, setrvDryWeight] = useState<string>(localStorage.getItem("rvDryWeight") || "");
  const [rvGVWR, setrvGVWR] = useState<string>(localStorage.getItem("rvGVWR") || "");
  const [rvHitchWeight, setrvHitchWeight] = useState<string>(localStorage.getItem("rvHitchWeight") || "");
  const [truckGVWR, settruckGVWR] = useState<string>(localStorage.getItem("truckGVWR") || "");
  const [truckGCWR, settruckGCWR] = useState<string>(localStorage.getItem("truckGCWR") || "");
  const [truckPayloadCapacity, settruckPayloadCapacity] = useState<string>(localStorage.getItem("truckPayloadCapacity") || "");
  const [truckPassengers, settruckPassengers] = useState<string>(localStorage.getItem("truckPassengers") || "");
  const [truckCargo, settruckCargo] = useState<string>(localStorage.getItem("truckCargo") || "");
  const [rvPayloadWater, setrvPayloadWater] = useState<string>(localStorage.getItem("rvPayloadWater") || "");
  const [rvPayloadPropane, setrvPayloadPropane] = useState<string>(localStorage.getItem("rvPayloadPropane") || "");
  const [rvPayloadBatteries, setrvPayloadBatteries] = useState<string>(localStorage.getItem("rvPayloadBatteries") || "");
  const [rvPayloadCampingGear, setrvPayloadCampingGear] = useState<string>(localStorage.getItem("rvPayloadCampingGear") || "");
  const [rvPayloadFoodClothesMisc, setrvPayloadFoodClothesMisc] = useState<string>(localStorage.getItem("rvPayloadFoodClothesMisc") || "");

  // ============================ Calculated Outputs ============================
  const [truckCurbWeight, settruckCurbWeight] = useState<number>(0);
  const [truckTowingCapacity, settruckTowingCapacity] = useState<number>(0);
  const [truckTotalPayload, settruckTotalPayload] = useState<number>(0);
  const [truckTotalPayloadHitched, settruckTotalPayloadHitched] = useState<number>(0);
  const [truckPayloadLeftover, settruckPayloadLeftover] = useState<number>(0);
  const [rvGrossWeightEstimate, setrvGrossWeightEstimate] = useState<number>(0);
  const [rvAvailablePayload, setrvAvailablePayload] = useState<number>(0);
  const [GCVWHitched, setGCVWHitched] = useState<number>(0);
  const [GCVWAvailable, setGCVWAvailable] = useState<number>(0);

  // ============================ Print Dialog ============================
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  const [truckName, setTruckName] = useState("");
  const [trailerName, setTrailerName] = useState("");

  useEffect(() => {
    localStorage.setItem("rvDryWeight", rvDryWeight);
    localStorage.setItem("rvGVWR", rvGVWR);
    localStorage.setItem("rvHitchWeight", rvHitchWeight);
    localStorage.setItem("truckGVWR", truckGVWR);
    localStorage.setItem("truckGCWR", truckGCWR);
    localStorage.setItem("truckPayloadCapacity", truckPayloadCapacity);
    localStorage.setItem("truckPassengers", truckPassengers);
    localStorage.setItem("truckCargo", truckCargo);
    localStorage.setItem("rvPayloadWater", rvPayloadWater);
    localStorage.setItem("rvPayloadPropane", rvPayloadPropane);
    localStorage.setItem("rvPayloadBatteries", rvPayloadBatteries);
    localStorage.setItem("rvPayloadCampingGear", rvPayloadCampingGear);
    localStorage.setItem("rvPayloadFoodClothesMisc", rvPayloadFoodClothesMisc);

    const CALrvHitchWeight = parseFloat(rvHitchWeight) || 0;
    const CALtruckGVWR = parseFloat(truckGVWR) || 0;
    const CALtruckGCWR = parseFloat(truckGCWR) || 0;
    const CALtruckPayloadCapacity = parseFloat(truckPayloadCapacity) || 0;
    const CALtruckPassengers = parseFloat(truckPassengers) || 0;
    const CALtruckCargo = parseFloat(truckCargo) || 0;
    const CALrvGVWR = parseFloat(rvGVWR) || 0;
    const CALrvDryWeight = parseFloat(rvDryWeight) || 0;
    const CALrvPayloadWater = parseFloat(rvPayloadWater) || 0;
    const CALrvPayloadPropane = parseFloat(rvPayloadPropane) || 0;
    const CALrvPayloadBatteries = parseFloat(rvPayloadBatteries) || 0;
    const CALrvPayloadCampingGear = parseFloat(rvPayloadCampingGear) || 0;
    const CALrvPayloadFoodClothesMisc = parseFloat(rvPayloadFoodClothesMisc) || 0;

    const totalPayload = CALtruckPassengers + CALtruckCargo;
    const payloadHitched = totalPayload + CALrvHitchWeight;
    const rvGrossEstimate = CALrvDryWeight + CALrvPayloadWater + CALrvPayloadPropane + CALrvPayloadBatteries + CALrvPayloadCampingGear + CALrvPayloadFoodClothesMisc;
    const truckCurb = CALtruckGVWR - CALtruckPayloadCapacity;
    const gcwrHitched = truckCurb + totalPayload + rvGrossEstimate;

    settruckCurbWeight(truckCurb);
    settruckTowingCapacity(CALtruckGCWR - CALtruckGVWR);
    settruckTotalPayload(totalPayload);
    settruckTotalPayloadHitched(payloadHitched);
    settruckPayloadLeftover(CALtruckPayloadCapacity - payloadHitched);
    setrvGrossWeightEstimate(rvGrossEstimate);
    setrvAvailablePayload(CALrvGVWR - rvGrossEstimate);
    setGCVWHitched(gcwrHitched);
    setGCVWAvailable(CALtruckGCWR - gcwrHitched);
  }, [
    truckGVWR,
    truckPayloadCapacity,
    truckGCWR,
    truckPassengers,
    truckCargo,
    rvHitchWeight,
    rvDryWeight,
    rvGVWR,
    rvPayloadWater,
    rvPayloadPropane,
    rvPayloadBatteries,
    rvPayloadCampingGear,
    rvPayloadFoodClothesMisc
  ]);

  const generatePrintableReport = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const logoUrl = window.location.origin + "/logo512.png";
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).format(currentDate);
    const copyrightYear = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
    }).format(currentDate);
    const html = `
  <html>
    <head>
      <title>Tow Calculator Report | towcalculator.app</title>
      <style>
        body { font-family: sans-serif; padding: 2rem; max-width: 800px; margin: auto; }
        .header { display: flex; align-items: center; gap: 1rem; }
        .header img { max-width: 120px; height: auto; }
        .header-text { display: flex; flex-direction: column; justify-content: center; }
        .header-text h2, .header-text h3 { margin: 0.2rem 0; line-height: 1.2; }
        h2, h3 { margin: 0.3rem 0; }
        table { width: 80%; border-collapse: collapse; margin-top: 0.50rem; }
        th { width: 65%; }
        td { width: 35%; }
        th, td { border: 1px solid #ccc; padding: 0.25rem; text-align: left; }
        .section { margin-top: 1.25rem; }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="${logoUrl}" alt="Logo" />
        <div class="header-text">
          <h2>Tow Calculator</h2>
          <h3>Truck: ${truckName}</h3>
          <h3>Trailer: ${trailerName}</h3>
          <p>Date: ${formattedDate}</p>
        </div>
      </div>

      <div class="section">
        <h3>Truck Data</h3>
        <table>
          <tr><th>GVWR</th><td>${truckGVWR} lbs</td></tr>
          <tr><th>GCWR</th><td>${truckGCWR} lbs</td></tr>
          <tr><th>Payload Capacity</th><td>${truckPayloadCapacity} lbs</td></tr>
          <tr><th>Passengers</th><td>${truckPassengers} lbs</td></tr>
          <tr><th>Cargo</th><td>${truckCargo} lbs</td></tr>
          <tr><th>Curb Weight</th><td>${truckCurbWeight} lbs</td></tr>
          <tr><th>Towing Capacity</th><td>${truckTowingCapacity} lbs</td></tr>
          <tr><th>Total Payload (with Hitch)</th><td>${truckTotalPayloadHitched} lbs</td></tr>
          <tr><th>Available Payload</th><td>${truckPayloadLeftover} lbs</td></tr>
        </table>
      </div>

      <div class="section">
        <h3>RV / Trailer Data</h3>
        <table>
          <tr><th>Dry Weight</th><td>${rvDryWeight} lbs</td></tr>
          <tr><th>GVWR</th><td>${rvGVWR} lbs</td></tr>
          <tr><th>Hitch Weight</th><td>${rvHitchWeight} lbs</td></tr>
          <tr><th>Water</th><td>${rvPayloadWater} lbs</td></tr>
          <tr><th>Propane</th><td>${rvPayloadPropane} lbs</td></tr>
          <tr><th>Batteries</th><td>${rvPayloadBatteries} lbs</td></tr>
          <tr><th>Camping Gear</th><td>${rvPayloadCampingGear} lbs</td></tr>
          <tr><th>Food/Clothes/Misc</th><td>${rvPayloadFoodClothesMisc} lbs</td></tr>
          <tr><th>Gross Weight Estimate</th><td>${rvGrossWeightEstimate} lbs</td></tr>
          <tr><th>Available Payload</th><td>${rvAvailablePayload} lbs</td></tr>
        </table>
      </div>

      <div class="section">
        <h3>GCWR Summary</h3>
        <table>
          <tr><th>GCWR Hitched</th><td>${GCVWHitched} lbs</td></tr>
          <tr><th>GCWR Available</th><td>${GCVWAvailable} lbs</td></tr>
        </table>
      </div>

      <script>window.onload = () => window.print();</script>
      <p style="font-style: italic;">© ${copyrightYear} https://towcalculator.app</p>
    </body>
  </html>
`;
    printWindow.document.write(html);
    printWindow.document.close();
    setShowPrintDialog(false);
  };

  return (
    <div>
      <div>
      <div>
        <img src="/logo512.png"></img>
        <h2>Towing Calculator</h2>
        <hr></hr>
        {/* ============================ Truck Specs ============================ */}
        <h3>Truck Specs</h3>
        <div className="input-group">
          <label>GVWR:</label>
          <input
            type="number"
            value={truckGVWR}
            onChange={(e) => settruckGVWR(e.target.value)}
          />
        </div>
        <div className="HelpText">
          <strong>G</strong>ross <strong>V</strong>ehicle <strong>W</strong>
          eight <strong>R</strong>ating
        </div>
        <div className="input-group">
          <label>GCWR:</label>
          <input
            type="number"
            value={truckGCWR}
            onChange={(e) => settruckGCWR(e.target.value)}
          />
        </div>
        <div className="HelpText">
          <strong>G</strong>ross <strong>C</strong>ombined <strong>W</strong>
          eight <strong>R</strong>ating
        </div>
        <div className="input-group">
          <label>Payload Capacity:</label>
          <input
            type="number"
            value={truckPayloadCapacity}
            onChange={(e) => settruckPayloadCapacity(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="result-label">Curb Weight:</span>
          <span className="result-value">
            {truckCurbWeight.toLocaleString()}
          </span>
        </div>
        <div className="HelpText">GVWR - Payload capacity</div>
        <div className="input-group">
          <span className="result-label">Towing Capacity:</span>
          <span className="result-value">
            {truckTowingCapacity.toLocaleString()}
          </span>
        </div>
        <div className="HelpText">GCWR - GVWR (assumes payload is at max)</div>
      </div>
      {/* ============================ RV Specs ============================ */}
      <h3>RV Specs</h3>
      <div className="input-group">
        <label>Dry Weight:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>GVWR:</label>
        <input
          type="number"
          value={rvGVWR}
          onChange={(e) => setrvGVWR(e.target.value)}
        />
      </div>
      <div className="HelpText">
        <strong>G</strong>ross <strong>V</strong>ehicle <strong>W</strong>
        eight <strong>R</strong>ating
      </div>
      <div className="input-group">
        <label>Hitch Weight:</label>
        <input
          type="number"
          value={rvHitchWeight}
          onChange={(e) => setrvHitchWeight(e.target.value)}
        />
      </div>
      <div className="HelpText">
        Typically 10-15% of total loaded trailer weight
      </div>
      {/* ============================ Truck GVWR & Payload ============================ */}
      <h3>Truck GVWR & Payload</h3>
      <div className="input-group">
        <label>Passengers</label>
        <input
          type="number"
          value={truckPassengers}
          onChange={(e) => settruckPassengers(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Cargo</label>
        <input
          type="number"
          value={truckCargo}
          onChange={(e) => settruckCargo(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span className="result-label">Total Payload (no hitch):</span>
        <span className="result-value">
          {truckTotalPayload.toLocaleString()}
        </span>
      </div>
      <div className="HelpText">Passengers + Cargo</div>
      <div className="input-group">
        <span className="result-label">RV Hitch Weight:</span>
        <span className="result-value">{rvHitchWeight.toLocaleString()}</span>
      </div>
      <div className="HelpText">Entered above in RV specs</div>
      <div className="input-group">
        <span className="result-label">Total payload (w/ hitch):</span>
        <span className="result-value">
          {truckTotalPayloadHitched.toLocaleString()}
        </span>
      </div>
      <div className="HelpText">Total payload + Hitch weight</div>
      <div className="input-group">
        <span className="result-label">Truck Available Payload:</span>
        <span className="result-value">
          {truckPayloadLeftover.toLocaleString()}
        </span>
      </div>
      <div className="HelpText">
        Remaining available payload in truck. Negative number here means truck
        is overloaded.
      </div>
      {/* ============================ RV GVWR & Payload ============================ */}
      <h3>RV GVWR & Payload</h3>
      <div className="input-group">
        <span className="result-label">Dry Weight:</span>
        <span className="result-value">{rvDryWeight.toLocaleString()}</span>
      </div>
      <div className="HelpText">Entered above in RV specs</div>
      <div className="input-group">
        <label>Total Water:</label>
        <input
          type="number"
          value={rvPayloadWater}
          onChange={(e) => setrvPayloadWater(e.target.value)}
        />
      </div>
      <div className="HelpText">1 gallon of water = 8.35 lbs.</div>
      <div className="input-group">
        <label>Propane:</label>
        <input
          type="number"
          value={rvPayloadPropane}
          onChange={(e) => setrvPayloadPropane(e.target.value)}
        />
      </div>
      <div className="HelpText">
        Verify if this is already included in RV dry weight
      </div>
      <div className="input-group">
        <label>Batteries:</label>
        <input
          type="number"
          value={rvPayloadBatteries}
          onChange={(e) => setrvPayloadBatteries(e.target.value)}
        />
      </div>
      <div className="HelpText">
        Verify if this is already included in RV dry weight
      </div>
      <div className="input-group">
        <label>Camping Gear:</label>
        <input
          type="number"
          value={rvPayloadCampingGear}
          onChange={(e) => setrvPayloadCampingGear(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Food/Clothes/Misc:</label>
        <input
          type="number"
          value={rvPayloadFoodClothesMisc}
          onChange={(e) => setrvPayloadFoodClothesMisc(e.target.value)}
        />
      </div>
      <div className="input-group">
        <span className="result-label">Gross Weight Estimate:</span>
        <span className="result-value">
          {rvGrossWeightEstimate.toLocaleString()}
        </span>
      </div>
      <div className="HelpText">Dry weight + all cargo</div>
      <div className="input-group">
        <span className="result-label">RV GVWR:</span>
        <span className="result-value">{rvGVWR.toLocaleString()}</span>
      </div>
      <div className="HelpText">Entered above in RV specs</div>
      <div className="input-group">
        <span className="result-label">RV Available Payload:</span>
        <span className="result-value">
          {rvAvailablePayload.toLocaleString()}
        </span>
      </div>
      <div className="HelpText">
        Remaining available payload in RV. Negative number here means RV is
        overloaded.
      </div>
      {/* ============================ GCWR and Tow Capacity ============================ */}
      <h3>GCWR and Tow Capacity</h3>
      <div className="input-group">
        <span className="result-label">GCWR Hitched:</span>
        <span className="result-value">{GCVWHitched.toLocaleString()}</span>
      </div>
      <div className="HelpText">
        Truck curb weight + truck payload + RV gross weight estimate
      </div>
      <div className="input-group">
        <span className="result-label">GCWR Available:</span>
        <span className="result-value">{GCVWAvailable.toLocaleString()}</span>
      </div>
      <div className="HelpText">
        GCWR - GCWR Hitched (immediately above value). This is how much more you
        could tow, in theory.
      </div>
      <div className="print-button-container">
      <button onClick={() => setShowPrintDialog(true)}>Generate Tow Report</button>
      </div>
      {showPrintDialog && (
        <div className="print-dialog">
          <div className="print-dialog-content">
            <h4>Provide Truck and Trailer Name</h4>
            <label>Truck Name: </label>
            <input type="text" value={truckName} onChange={(e) => setTruckName(e.target.value)} />
            <br></br>
            <br></br>
            <label>Trailer Name: </label>
            <input type="text" value={trailerName} onChange={(e) => setTrailerName(e.target.value)} />
            <div style={{ marginTop: '1rem' }}>
              <button onClick={generatePrintableReport}>Generate Report</button>
              <button onClick={() => setShowPrintDialog(false)} style={{ marginLeft: '1rem' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      <div className="footer">
        <hr></hr>
        <p>
          The towing calculator is an open source project created by Abrom
          Douglas III. Support this app and others{" "}
          <a href="https://ko-fi.com/abrom" target="_blank">
            here
          </a>
          .
        </p>
        <p>
          To learn more visit the{" "}
          <a
            href="https://github.com/iamabrom/towcalculator#readme"
            target="_blank"
          >
            GitHub repo
          </a>
        </p>
        <p>
          Something broken, want a feature added, or just want to say hi- create
          a{" "}
          <a
            href="https://github.com/iamabrom/towcalculator/issues/new"
            target="_blank"
          >
            issue
          </a>{" "}
          or start/participate in a{" "}
          <a
            href="https://github.com/iamabrom/towcalculator/discussions"
            target="_blank"
          >
            discussion
          </a>
        </p>
        <hr></hr>
        <p className="copyrightcenter">
          ©2025{" Abrom Douglas III"}
          <br></br>
          <a href="https://weekendrvers.com" target="_blank">
            weekendrvers.com
          </a>{" "}
          <a href="https://abrom.dev" target="_blank">
            abrom.dev
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Calculator;
