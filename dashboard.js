const EVENTS = {
    "600": {
        route: "https://ridewithgps.com/routes/44588666"
    },
    "200": {
        route: "https://ridewithgps.com/routes/49469273"
    },
    "300": {
        route: "https://ridewithgps.com/routes/46588152"
    },
    "400": {
        route: "https://ridewithgps.com/routes/49468783"
    }
};

async function initDashboard() {

    document.getElementById("events").innerHTML = `
        <div class="event">
            <div class="event-title">
                Loading Dashboard...
            </div>
        </div>
    `;

    const [e600, e200, e300, e400] =
        await Promise.all([
            fetch("https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/600").then(r => r.json()),
            fetch("https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/200").then(r => r.json()),
            fetch("https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/300").then(r => r.json()),
            fetch("https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/400").then(r => r.json())
        ]);

    const totalRegistrations =
        e600.riderCount +
        e200.riderCount +
        e300.riderCount +
        e400.riderCount;

    document.getElementById("summary").innerHTML = `

        <h2>One Week SR Tracker</h2>

        <p>
            Total Registrations:
            <span class="badge">
                ${totalRegistrations}
            </span>
        </p>

        <div class="tab-bar">

            <button class="event-tab"
                    onclick="showOneWeekSR()">
                ONE WEEK SR RIDERS
            </button>

            <button class="event-tab"
                    onclick="showEvent('600')">
                600 BRM (${e600.riderCount})
            </button>

            <button class="event-tab"
                    onclick="showEvent('200')">
                200 BRM (${e200.riderCount})
            </button>

            <button class="event-tab"
                    onclick="showEvent('300')">
                300 BRM (${e300.riderCount})
            </button>

            <button class="event-tab"
                    onclick="showEvent('400')">
                400 BRM (${e400.riderCount})
            </button>

        </div>
    `;

    document.getElementById("events").innerHTML = `
        <div id="eventContent">

            <div class="event">

                <div class="event-title">
                    Welcome
                </div>

                <div class="section-body">
                    Select a BRM or ONE WEEK SR RIDERS.
                </div>

            </div>

        </div>
    `;
}

async function showOneWeekSR() {

    document.getElementById("eventContent").innerHTML = `
        <div class="event">
            <div class="event-title">
                Loading ONE WEEK SR Riders...
            </div>
        </div>
    `;

    const distances = ["200", "300", "400", "600"];

    const results = await Promise.all(
        distances.map(d =>
            fetch(
                `https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/${d}`
            ).then(r => r.json())
        )
    );

    const riderMap = {};

    results.forEach((event, index) => {

        const distance = distances[index];

        (event.riders || []).forEach(rider => {

            if (!riderMap[rider.air]) {

                riderMap[rider.air] = {
                    air: rider.air,
                    name: rider.name,
                    club: rider.club,
                    events: []
                };

            }

            riderMap[rider.air].events.push(distance);

        });

    });

    const riders =
        Object.values(riderMap)
        .filter(r => r.events.length === 4);

    const rows =
        riders.map(r => `
            <tr>
                <td>${r.air}</td>
                <td>${r.name}</td>
                <td>${r.club}</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
            </tr>
        `).join("");

    document.getElementById("eventContent").innerHTML = `

        <div class="event">

            <div class="event-title">
                ONE WEEK SR RIDERS
            </div>

            <div class="section-body">

                <p>
                    Riders Registered For All 4 Events:
                    <span class="badge">
                        ${riders.length}
                    </span>
                </p>

                <table>

                    <thead>

                        <tr>
                            <th>AIR</th>
                            <th>Rider</th>
                            <th>Club</th>
                            <th>200</th>
                            <th>300</th>
                            <th>400</th>
                            <th>600</th>
                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>

        </div>
    `;
}

async function showEvent(distance) {

    document.getElementById("eventContent").innerHTML = `
        <div class="event">
            <div class="event-title">
                Loading...
            </div>
        </div>
    `;

    const eventData =
        await fetch(
            `https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/${distance}`
        ).then(r => r.json());

    const routeData =
        await fetch(`data/${distance}.json`)
        .then(r => r.json());

    const ridersHtml =
        (eventData.riders || [])
        .map(r => `
            <tr>
                <td>${r.seq}</td>
                <td>${r.air}</td>
                <td>${r.name}</td>
                <td>${r.result}</td>
                <td>${r.club}</td>
            </tr>
        `)
        .join("");

    const controlsHtml =
        (routeData.controls || [])
        .map(c => `
            <tr>
                <td>${c.km}</td>
                <td>${c.location}</td>
                <td>${c.type}</td>
            </tr>
        `)
        .join("");

    const checkpointsHtml =
        (routeData.controls || [])
        .map(c => `
            <tr>
                <td>${c.location}</td>
                <td>${c.km}</td>
            </tr>
        `)
        .join("");

    document.getElementById("eventContent").innerHTML = `

        <div class="event">

            <div class="event-title">
                ${eventData.title}
            </div>

            <div class="section-title">
                DETAILS
            </div>

            <div class="section-body">

                <p><strong>Registration Close:</strong> ${eventData.registrationClose}</p>

                <p><strong>Start Time:</strong> ${eventData.startTime}</p>

                <p><strong>Start Location:</strong> ${eventData.startLocation}</p>

                <p>
                    <strong>Registered Riders:</strong>
                    <span class="badge">${eventData.riderCount}</span>
                </p>

                <a class="button green"
                   href="${EVENTS[distance].route}"
                   target="_blank">
                   VIEW ROUTE
                </a>

            </div>

            <div class="section-title">
                FELLOW RIDERS
            </div>

            <div class="section-body">

                <table>

                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>AIR</th>
                            <th>Rider</th>
                            <th>Result</th>
                            <th>Club</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${ridersHtml}
                    </tbody>

                </table>

            </div>

            <div class="section-title">
                CONTROLS
            </div>

            <div class="section-body">

                <table>

                    <thead>
                        <tr>
                            <th>KM</th>
                            <th>Location</th>
                            <th>Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${controlsHtml}
                    </tbody>

                </table>

            </div>

            <div class="section-title">
  dy">

                <table>

                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>KM</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${checkpointsHtml}
                    </tbody>

                </table>

            </div>

        </div>
    `;
}

initDashboard();
