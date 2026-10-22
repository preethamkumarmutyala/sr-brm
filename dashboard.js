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

document.getElementById("summary").innerHTML = `
<h2>SR BRM Registration Dashboard</h2>

<div class="tab-bar">

<button class="event-tab" onclick="showCommonRiders()">
SR CANDIDATES
</button>

<button class="event-tab" onclick="showEvent('600')">
600 BRM
</button>

<button class="event-tab" onclick="showEvent('200')">
200 BRM
</button>

<button class="event-tab" onclick="showEvent('300')">
300 BRM
</button>

<button class="event-tab" onclick="showEvent('400')">
400 BRM
</button>

</div>
`;

document.getElementById("events").innerHTML = `
<div id="eventContent">
<div class="event">
<div class="event-title">
Select a BRM
</div>
</div>
</div>
`;

async function showCommonRiders() {

    document.getElementById("eventContent").innerHTML = `
    <div class="event">
        <div class="event-title">
            Loading SR Candidates...
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

            const key = rider.air;

            if (!riderMap[key]) {
                riderMap[key] = {
                    air: rider.air,
                    name: rider.name,
                    club: rider.club,
                    events: []
                };
            }

            riderMap[key].events.push(distance);

        });

    });

    const commonRiders =
        Object.values(riderMap)
        .filter(r => r.events.length === 4);

    const rows = commonRiders
        .map(r => `
            <tr>
                <td>${r.air}</td>
                <td>${r.name}</td>
                <td>${r.club}</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
                <td>✅</td>
            </tr>
        `)
        .join("");

    document.getElementById("eventContent").innerHTML = `

    <div class="event">

        <div class="event-title">
            Super Randonneur Candidates
        </div>

        <div class="section-body">

            <p>
                Total SR Candidates:
                <span class="badge">
                    ${commonRiders.length}
                </span>
            </p>

            <table>

                <thead>

                    <tr>
                        <th>AIR</th>
                        <th>Name</th>
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

    const event = EVENTS[distance];

    document.getElementById("eventContent").innerHTML = `
    <div class="event">
        <div class="event-title">
            Loading...
        </div>
    </div>
    `;

    const response =
        await fetch(
            `https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/${distance}`
        );

    const data =
        await response.json();

    const ridersHtml =
        (data.riders || [])
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

    document.getElementById("eventContent").innerHTML = `

    <div class="event">

        <div class="event-title">
            ${data.title}
        </div>

        <div class="section-title">
            DETAILS
        </div>

        <div class="section-body">

            <p>
                <strong>Registration Close:</strong>
                ${data.registrationClose}
            </p>

            <p>
                <strong>Registered Riders:</strong>
                <span class="badge">
                    ${data.riderCount}
                </span>
            </p>

            <a
                class="button green"
                href="${event.route}"
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
                        <th>AIR Number</th>
                        <th>Rider Name</th>
                        <th>Result</th>
                        <th>Club</th>
                    </tr>

                </thead>

                <tbody>

                    ${ridersHtml}

                </tbody>

            </table>

        </div>

    </div>

    `;
}
