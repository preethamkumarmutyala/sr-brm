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

        <div class="section-body">
            Click any BRM button above.
        </div>

    </div>

</div>
`;

async function showEvent(distance) {

    const event = EVENTS[distance];

    document.getElementById("eventContent").innerHTML = `
    <div class="event">
        <div class="event-title">
            Loading ${distance} BRM...
        </div>
    </div>
    `;

    try {

        const response =
            await fetch(
                `https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/${distance}`
            );

        const data =
            await response.json();

        const ridersHtml =
            (data.riders || [])
            .map((r, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${r.air}</td>
                    <td>${r.name}</td>
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
                    ${data.riderCount}
                </p>

                <a
                    class="button green"
                    target="_blank"
                    href="${event.route}">
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
                            <th>#</th>
                            <th>AIR</th>
                            <th>Name</th>
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
    catch (error) {

        document.getElementById("eventContent").innerHTML = `

        <div class="event">

            <div class="event-title">
                Error loading ${distance} BRM
            </div>

            <div class="section-body">
                ${error}
            </div>

        </div>

        `;

    }

}
