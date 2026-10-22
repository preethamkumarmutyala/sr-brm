const EVENTS = [

{
    name: "600 BRM",
    route: "https://ridewithgps.com/routes/44588666",
    audax: "https://www.audaxindia.in/event-e-10047"
},

{
    name: "200 BRM",
    route: "https://ridewithgps.com/routes/49469273",
    audax: "https://www.audaxindia.in/event-e-10048"
},

{
    name: "300 BRM",
    route: "https://ridewithgps.com/routes/46588152",
    audax: "https://www.audaxindia.in/event-e-10049"
},

{
    name: "400 BRM",
    route: "https://ridewithgps.com/routes/49468783",
    audax: "https://www.audaxindia.in/event-e-10050"
}

];

document.getElementById("summary").innerHTML = `
<h2>Registration Dashboard</h2>
<p>
Click a BRM to expand details.
</p>
`;

let html = "";

for (const event of EVENTS) {

    html += `

    <details class="event">

        <summary class="event-title">
            ${event.name}
        </summary>

        <div class="section-title">
            DETAILS
        </div>

        <div class="section-body">

            <p>
                Event details will load from Audax.
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

            Registration extraction coming next.

        </div>

        <div class="section-title">
            CONTROLS
        </div>

        <div class="section-body">

            Controls will be loaded next.

        </div>

    </details>

    `;
}

document.getElementById("events").innerHTML = html;
