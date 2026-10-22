const EVENTS = [
    {
        distance: "1000",
        route: "https://ridewithgps.com/routes/52862280",
        audax: "https://www.audaxindia.in/event-e-10046"
    },
    {
        distance: "600",
        route: "https://ridewithgps.com/routes/44588666",
        audax: "https://www.audaxindia.in/event-e-10047"
    },
    {
        distance: "200",
        route: "https://ridewithgps.com/routes/49469273",
        audax: "https://www.audaxindia.in/event-e-10048"
    },
    {
        distance: "300",
        route: "https://ridewithgps.com/routes/46588152",
        audax: "https://www.audaxindia.in/event-e-10049"
    },
    {
        distance: "400",
        route: "https://ridewithgps.com/routes/49468783",
        audax: "https://www.audaxindia.in/event-e-10050"
    }
];

async function load() {

    document.getElementById("summary").innerHTML =
        `
        <h2>Registration Summary</h2>
        <p>This is the first working dashboard build.</p>
        `;

    let html = "";

    for (const e of EVENTS) {

        html += `

        <div class="event">

            <div class="event-title">
                ${e.distance} BRM
            </div>

            <div class="section-title">
                DETAILS
            </div>

            <div class="section-body">

                <a class="button green"
                   href="${e.route}"
                   target="_blank">
                   VIEW ROUTE
                </a>

                <a class="button orange"
                   href="${e.audax}"
                   target="_blank">
                   AUDAX PAGE
                </a>

            </div>

            <div class="section-title">
                STATUS
            </div>

            <div class="section-body">

                Live registration extraction
                will be added next.

            </div>

        </div>

        `;
    }

    document.getElementById("events").innerHTML = html;
}

load();
