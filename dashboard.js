const EVENTS = {
    "600": {
        route: "https://ridewithgps.com/routes/44588666",
        audax: "https://www.audaxindia.in/event-e-10047"
    },

    "200": {
        route: "https://ridewithgps.com/routes/49469273",
        audax: "https://www.audaxindia.in/event-e-10048"
    },

    "300": {
        route: "https://ridewithgps.com/routes/46588152",
        audax: "https://www.audaxindia.in/event-e-10049"
    },

    "400": {
        route: "https://ridewithgps.com/routes/49468783",
        audax: "https://www.audaxindia.in/event-e-10050"
    }
};

document.getElementById("summary").innerHTML = `
<h2>Registration Dashboard</h2>
<p>Select a BRM below.</p>

<div class="tab-bar">

    <button onclick="showEvent('600')">
        600 BRM
    </button>

    <button onclick="showEvent('200')">
        200 BRM
    </button>

    <button onclick="showEvent('300')">
        300 BRM
    </button>

    <button onclick="showEvent('400')">
        400 BRM
    </button>

</div>
`;

document.getElementById("events").innerHTML =
`
<div id="eventContent">

    <div class="event">

        <div class="event-title">
            Select a BRM Above
        </div>

    </div>

</div>
`;

function showEvent(distance){

    const event = EVENTS[distance];

    document.getElementById(
        "eventContent"
    ).innerHTML = `

    <div class="event">

        <div class="event-title">
            ${distance} BRM
        </div>

        <div class="section-title">
            DETAILS
        </div>

        <div class="section-body">

            <p>
                Event details will be loaded
                from Audax.
            </p>

            <a
                class="button green"
                target="_blank"
                href="${event.route}">

                VIEW ROUTE

            </a>

            <a
                class="button orange"
                target="_blank"
                href="${event.audax}">

                AUDAX PAGE

            </a>

        </div>

        <div class="section-title">
            FELLOW RIDERS
        </div>

        <div class="section-body">

            Rider extraction will go here.

        </div>

        <div class="section-title">
            CONTROLS
        </div>

        <div class="section-body">

            Controls will go here.

        </div>

    </div>

    `;
}
