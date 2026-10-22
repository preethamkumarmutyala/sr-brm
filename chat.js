let chatLoaded = false;

function openBRMAssistant() {

    if (chatLoaded) {
        return;
    }

    chatLoaded = true;

    const chatHtml = `

    <div class="event">

        <div class="event-title">
            BRM Assistant
        </div>

        <div class="section-body">

            <p>
                Ask questions like:
            </p>

            <ul>
                <li>600 riders</li>
                <li>200 riders</li>
                <li>400 controls</li>
                <li>600 controls</li>
                <li>one week sr riders</li>
                <li>start time of 400</li>
                <li>start location of 600</li>
                <li>registration close of 300</li>
            </ul>

            <input
                id="brmQuestion"
                type="text"
                placeholder="Ask BRM Assistant..."
                style="width:70%;padding:12px;"
            >

            <button
                onclick="askBRMAssistant()"
                class="event-tab">
                Ask
            </button>

            <div id="chatResult"
                 style="margin-top:20px;">
            </div>

        </div>

    </div>

    `;

    document.getElementById("eventContent")
        .innerHTML = chatHtml;
}

async function askBRMAssistant() {

    const question =
        document
            .getElementById("brmQuestion")
            .value
            .toLowerCase()
            .trim();

    const result =
        document.getElementById("chatResult");

    result.innerHTML = "Loading...";

    try {

        const e200 =
            await fetch(
                "https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/200"
            ).then(r => r.json());

        const e300 =
            await fetch(
                "https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/300"
            ).then(r => r.json());

        const e400 =
            await fetch(
                "https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/400"
            ).then(r => r.json());

        const e600 =
            await fetch(
                "https://sr-brm-api.secunderabadrandonneurs.workers.dev/event/600"
            ).then(r => r.json());

        const events = {
            "200": e200,
            "300": e300,
            "400": e400,
            "600": e600
        };

        if (question.includes("one week sr")) {

            const riderMap = {};

            [e200, e300, e400, e600]
                .forEach(event => {

                    (event.riders || [])
                        .forEach(rider => {

                            if (!riderMap[rider.air]) {

                                riderMap[rider.air] = {
                                    air: rider.air,
                                    name: rider.name,
                                    club: rider.club,
                                    count: 0
                                };

                            }

                            riderMap[rider.air].count++;

                        });

                });

            const riders =
                Object.values(riderMap)
                    .filter(r => r.count === 4);

            result.innerHTML = `
                <h3>
                    One Week SR Riders
                </h3>

                <p>
                    Total:
                    <strong>
                        ${riders.length}
                    </strong>
                </p>

                ${riders
                    .map(r =>
                        `${r.air} - ${r.name} (${r.club})`
                    )
                    .join("<br>")
                }
            `;

            return;
        }

        const eventMatch =
            question.match(
                /(200|300|400|600)/
            );

        if (!eventMatch) {

            result.innerHTML =
                "Please specify 200, 300, 400 or 600.";

            return;
        }

        const distance =
            eventMatch[1];

        const event =
            events[distance];

        if (question.includes("riders")) {

            result.innerHTML = `

                <h3>${event.title}</h3>

                Registered Riders:
                <strong>${event.riderCount}</strong>

                <hr>

                ${(event.riders || [])
                    .map(r =>
                        `${r.air} - ${r.name}`
                    )
                    .join("<br>")
                }

            `;

            return;
        }

        if (
            question.includes("start time")
        ) {

            result.innerHTML = `
                <h3>${event.title}</h3>

                Start Time:
                <strong>
                    ${event.startTime}
                </strong>
            `;

            return;
        }

        if (
            question.includes("start location")
        ) {

            result.innerHTML = `
                <h3>${event.title}</h3>

                Start Location:
                <strong>
                    ${event.startLocation}
                </strong>
            `;

            return;
        }

        if (
            question.includes("registration")
        ) {

            result.innerHTML = `
                <h3>${event.title}</h3>

                Registration Close:
                <strong>
                    ${event.registrationClose}
                </strong>
            `;

            return;
        }

        if (
            question.includes("controls")
        ) {

            const routeData =
                await fetch(
                    `data/${distance}.json`
                ).then(r => r.json());

            result.innerHTML = `

                <h3>
                    ${distance} Controls
                </h3>

                ${routeData.controls
                    .map(c =>
                        `${c.km} km - ${c.location}`
                    )
                    .join("<br>")
                }

            `;

            return;
        }

        result.innerHTML =
            "I couldn't understand the question.";

    }
    catch (err) {

        result.innerHTML =
            "Error: " + err;

    }
}
