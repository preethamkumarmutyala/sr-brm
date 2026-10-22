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
Click any BRM above.
</div>

</div>

</div>
`;

async function showEvent(distance) {

    const event = EVENTS[distance];

    document.getElementById("eventContent").innerHTML = `
        <div class="event">
            <div class="event-title">
                Loading...
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
            .map(r => `
                <tr>
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

 
