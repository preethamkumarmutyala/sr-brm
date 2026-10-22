const EVENTS = [
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

async function loadDashboard() {

    document.getElementById("summary").innerHTML = `
        <h2>Registration Dashboard</h2>
        <p>
            600, 200, 300 and 400 BRMs
        </p>
    `;

    let html = "";

    for (const event of EVENTS) {

        html += `

        <div class="event">

            <div class="event-title">
                ${event.distance} BRM
            </div>

            <div class="section-title">
                DETAILS
            </div>

            <div class="section-body">

                <p>
                    Registration information will be loaded from Audax.
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

                Live rider extraction coming next.

            </div>

        </div>

        `;
    }

    document.getElementById("events").innerHTML = html;
}

loadDashboard();
