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

  // ============================ Calculated Outputs ============================
  const [truckCurbWeight, settruckCurbWeight] = useState<number>(0);
  const [truckTowingCapacity, settruckTowingCapacity] = useState<number>(0);
  const [truckTotalPayload, settruckTotalPayload] = useState<number>(0);
  const [truckTotalPayloadHitched, settruckTotalPayloadHitched] =
    useState<number>(0);
  const [truckPayloadLeftover, settruckPayloadLeftover] = useState<number>(0);

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

    // ============================ Math parsing ============================
    const CALrvHitchWeight = parseFloat(rvHitchWeight) || 0;
    const CALtruckGVWR = parseFloat(truckGVWR) || 0;
    const CALtruckGCWR = parseFloat(truckGCWR) || 0;
    const CALtruckPayloadCapacity = parseFloat(truckPayloadCapacity) || 0;
    const CALtruckPassengers = parseFloat(truckPassengers) || 0;
    const CALtruckCargo = parseFloat(truckCargo) || 0;

    // ============================ Math calculations ============================
    settruckCurbWeight(CALtruckGVWR - CALtruckPayloadCapacity);
    settruckTowingCapacity(CALtruckGCWR - CALtruckGVWR);
    settruckTotalPayload(CALtruckPassengers + CALtruckCargo);
    settruckTotalPayloadHitched(truckTotalPayload + CALrvHitchWeight);
    settruckPayloadLeftover(CALtruckPayloadCapacity - truckTotalPayloadHitched);
  }, [
    truckGVWR,
    truckPayloadCapacity,
    truckGCWR,
    truckPassengers,
    truckCargo,
    rvHitchWeight,
    rvDryWeight,
    rvGVWR,
    truckTotalPayloadHitched,
  ]);

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
        <div className="input-group">
          <label>GCWR:</label>
          <input
            type="number"
            value={truckGCWR}
            onChange={(e) => settruckGCWR(e.target.value)}
          />
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
        <div className="input-group">
          <span className="result-label">Towing Capacity:</span>
          <span className="result-value">
            {truckTowingCapacity.toLocaleString()}
          </span>
        </div>
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
      <div className="input-group">
        <label>Hitch Weight:</label>
        <input
          type="number"
          value={rvHitchWeight}
          onChange={(e) => setrvHitchWeight(e.target.value)}
        />
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
      <div className="input-group">
        <span className="result-label">RV Hitch Weight:</span>
        <span className="result-value">{rvHitchWeight.toLocaleString()}</span>
      </div>
      <div className="input-group">
        <span className="result-label">Total payload (w/ hitch):</span>
        <span className="result-value">
          {truckTotalPayloadHitched.toLocaleString()}
        </span>
      </div>
      <div className="input-group">
        <span className="result-label">Leftover Truck Payload:</span>
        <span className="result-value">
          {truckPayloadLeftover.toLocaleString()}
        </span>
      </div>
      {/* ============================ RV GVWR & Payload ============================ */}
      <h3>RV GVWR & Payload</h3>
      <div className="input-group">
        <label>Dry Weight:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Total Water:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Propane:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Batteries:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Camping Gear:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Food/Clothes/Misc:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>Gross Weight Estimate:</label>
        <input
          type="number"
          value={rvDryWeight}
          onChange={(e) => setrvDryWeight(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>RV GVWR:</label>
        <input
          type="number"
          value={rvGVWR}
          onChange={(e) => setrvGVWR(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label>RV Available Payload:</label>
        <input
          type="number"
          value={rvGVWR}
          onChange={(e) => setrvGVWR(e.target.value)}
        />
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
