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
            Select a BRM Above
        </div>

        <div class="section-body">
            Click 600, 200, 300 or 400 BRM.
        </div>

    </div>

</div>
`;

function showEvent(distance){

    document
        .querySelectorAll(".event-tab")
        .forEach(btn => btn.classList.remove("active"));

    event.target.classList.add("active");

    const current = EVENTS[distance];

    document.getElementById("eventContent").innerHTML = `

    <div class="event">

        <div class="event-title">
            ${distance} BRM
        </div>

        <div class="section-title">
            DETAILS
        </div>

        <div class="section-body">

            <p>
                Registration Close:
                To be loaded from Audax
            </p>

            <p>
                Start Location:
                To be loaded from Audax
            </p>

            <p>
                Start Time:
                To be loaded from Audax
            </p>

            <a
                class="button green"
                href="${current.route}"
                target="_blank">

                VIEW ROUTE

            </a>

            <a
                class="button orange"
                href="${current.audax}"
                target="_blank">

                AUDAX PAGE

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

                    <tr>
                        <td colspan="4">
                            Rider extraction coming next
                        </td>
                    </tr>

                </tbody>

            </table>

        </div>

        <div class="section-title">
            CONTROLS
        </div>

        <div class="section-body">

            <div class="control">
                Controls will be loaded next.
            </div>

        </div>

    </div>

    `;
}
