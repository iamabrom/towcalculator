import React, { useState, useEffect } from "react";

const Calculator = () => {
  // ============================ User Inputs ============================
  // RV dry weight
  const [rvDryWeight, setrvDryWeight] = useState<string>(
    localStorage.getItem("rvDryWeight") || ""
  );
  // RV GVWR
  const [rvGVWR, setrvGVWR] = useState<string>(
    localStorage.getItem("rvGVWR") || ""
  );
  // RV Hitch Weight
  const [rvHitchWeight, setrvHitchWeight] = useState<string>(
    localStorage.getItem("rvHitchWeight") || ""
  );
  // Truck GVWR
  const [truckGVWR, settruckGVWR] = useState<string>(
    localStorage.getItem("truckGVWR") || ""
  );
  // Truck GCWR
  const [truckGCWR, settruckGCWR] = useState<string>(
    localStorage.getItem("truckGCWR") || ""
  );

  // Truck Payload Capacity
  const [truckPayloadCapacity, settruckPayloadCapacity] = useState<string>(
    localStorage.getItem("truckPayloadCapacity") || ""
  );

  // Truck GVWR & Payload
  const [truckPassengers, settruckPassengers] = useState<string>(
    localStorage.getItem("truckPassengers") || ""
  );

  // Truck Cargo
  const [truckCargo, settruckCargo] = useState<string>(
    localStorage.getItem("truckCargo") || ""
  );

  // RV Payload: Total Water
  const [rvPayloadWater, setrvPayloadWater] = useState<string>(
    localStorage.getItem("rvPayloadWater") || ""
  );

  // RV Payload: Total Propane
  const [rvPayloadPropane, setrvPayloadPropane] = useState<string>(
    localStorage.getItem("rvPayloadPropane") || ""
  );

  // RV Payload: Total Batteries
  const [rvPayloadBatteries, setrvPayloadBatteries] = useState<string>(
    localStorage.getItem("rvPayloadBatteries") || ""
  );

  // RV Payload: Total Camping Gear
  const [rvPayloadCampingGear, setrvPayloadCampingGear] = useState<string>(
    localStorage.getItem("rvPayloadCampingGear") || ""
  );

  // RV Payload: Total Food, Clothes, Misc
  const [rvPayloadFoodClothesMisc, setrvPayloadFoodClothesMisc] =
    useState<string>(localStorage.getItem("rvPayloadFoodClothesMisc") || "");

  // ============================ Calculated Outputs ============================
  const [truckCurbWeight, settruckCurbWeight] = useState<number>(0);
  const [truckTowingCapacity, settruckTowingCapacity] = useState<number>(0);
  const [truckTotalPayload, settruckTotalPayload] = useState<number>(0);
  const [truckTotalPayloadHitched, settruckTotalPayloadHitched] =
    useState<number>(0);
  const [truckPayloadLeftover, settruckPayloadLeftover] = useState<number>(0);
  const [rvGrossWeightEstimate, setrvGrossWeightEstimate] = useState<number>(0);
  const [rvAvailablePayload, setrvAvailablePayload] = useState<number>(0);

  // ============================ Local storage for all user inputs ============================
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

    // ============================ Math parsing ============================
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
    const CALrvPayloadFoodClothesMisc =
      parseFloat(rvPayloadFoodClothesMisc) || 0;

    // ============================ Math calculations ============================
    settruckCurbWeight(CALtruckGVWR - CALtruckPayloadCapacity);
    settruckTowingCapacity(CALtruckGCWR - CALtruckGVWR);
    settruckTotalPayload(CALtruckPassengers + CALtruckCargo);
    settruckTotalPayloadHitched(truckTotalPayload + CALrvHitchWeight);
    settruckPayloadLeftover(CALtruckPayloadCapacity - truckTotalPayloadHitched);
    setrvGrossWeightEstimate(
      CALrvDryWeight +
        CALrvPayloadWater +
        CALrvPayloadPropane +
        CALrvPayloadBatteries +
        CALrvPayloadCampingGear +
        CALrvPayloadFoodClothesMisc
    );
    setrvAvailablePayload(CALrvGVWR - rvGrossWeightEstimate);
  }, [
    truckGVWR,
    truckPayloadCapacity,
    truckGCWR,
    truckPassengers,
    truckCargo,
    rvHitchWeight,
    rvDryWeight,
    rvGVWR,
    truckTotalPayload,
    truckTotalPayloadHitched,
    rvGrossWeightEstimate,
    rvAvailablePayload,
    rvPayloadWater,
    rvPayloadPropane,
    rvPayloadBatteries,
    rvPayloadCampingGear,
    rvPayloadFoodClothesMisc,
  ]);

  // const formatNumber = (num) => {
  //   return num.toLocaleString();
  // };

  // ============================ HTML components ============================
  return (
    <div>
      <div>
        <img src="/logo512.png"></img>
        <h2>Towing Calculator</h2>
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
      <div className="footer">
        <hr></hr>
        <p>
          ©2023{" "}
          <a href="https://weekendrvers.com" target="_blank">
            weekendrvers.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Calculator;
