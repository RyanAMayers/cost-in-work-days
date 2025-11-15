function main() {
    console.log("Script loaded successfully.");

    const $selectHourly = document.querySelector("#type-hourly");
    const $selectSalary = document.querySelector("#type-salary");

    const $inputHourlyParent = document.querySelector("#input-hourly-parent");
    const $inputSalaryParent = document.querySelector("#input-salary-parent");

    const $inputHourly = document.querySelector("#input-hourly");
    const $inputSalary = document.querySelector("#input-salary");

    const $inputCost = document.querySelector("#input-cost");

    const $calcButton = document.querySelector("#calculate");

    const $results = document.querySelector("#results");
    const $resultOutput = document.querySelector("#result-output");

    [$selectHourly, $selectSalary].forEach($select => {
        $select.addEventListener("click", () => {
            if ($selectHourly.checked) {
                $inputHourlyParent.style.display = "block";
                $inputSalaryParent.style.display = "none";
            } else if ($selectSalary.checked) {
                $inputHourlyParent.style.display = "none";
                $inputSalaryParent.style.display = "block";
            }
        });
    });

    $selectHourly.click();

    function calculateEffectiveHourly() {
        let effectiveHourly = 0;
        if ($selectHourly.checked) {
            if ($inputHourly.value === "" || isNaN(parseFloat($inputHourly.value)) || parseFloat($inputHourly.value) <= 0) {
                alert("Please enter a valid wage.");
                return 0;
            }
            const hourlyRate = parseFloat($inputHourly.value);
            console.log("Hourly rate from input:", hourlyRate);
            effectiveHourly = hourlyRate;
        } else if ($selectSalary.checked) {
            if ($inputSalary.value === "" || isNaN(parseFloat($inputSalary.value)) || parseFloat($inputHourly.value) <= 0) {
                alert("Please enter a valid salary.");
                return 0;
            }
            const annualSalary = parseFloat($inputSalary.value);
            console.log("Annual salary from input:", annualSalary);
            const workDaysPerYear = 52 * 5; // Approximate number of work days in a year
            const workHoursPerDay = 8; // Standard work hours per day
            effectiveHourly = annualSalary / (workDaysPerYear * workHoursPerDay);
        }
        // estimate tax withholdings, etc. at 25%
        effectiveHourly = effectiveHourly * 0.75;
        return effectiveHourly;
    }

    function outputResults(cost, hourly) {
        let outText = "";
        const totalHours = cost / hourly;
        let hours = totalHours;
        let days = 0;
        let weeks = 0;
        let months = 0;
        let years = 0;
        if (hours > 8) {
            days = Math.floor(hours / 8);
            hours = totalHours % 8;
            if (days > 5) {
                weeks = Math.floor(days / 5);
                days = days % 5;
                if (weeks > 4) {
                    if (weeks > 52) {
                        years = Math.floor(weeks / 52);
                        weeks = weeks % 52;
                        if (weeks > 4) {
                            months = Math.floor(weeks / 4);
                            weeks = weeks % 4;
                        }
                    } else {
                        months = Math.floor(weeks / 4);
                        weeks = weeks % 4;
                    }
                }
            }
        }
        if (years) {
            outText += `${years} year${years > 1 ? "s" : ""}, `;
        }
        if (months) {
            outText += `${months} month${months > 1 ? "s" : ""}, `;
        }
        if (weeks) {
            outText += `${weeks} week${weeks > 1 ? "s" : ""}, `;
        }
        if (days) {
            outText += `${days} day${days > 1 ? "s" : ""}, `;
        }
        outText += `${hours.toFixed(2)} hour${hours == 1 ? "" : "s"}`;
        $resultOutput.innerText = outText;
        $results.classList.remove("hide");
    }

    $calcButton.addEventListener("click", () => {
        let effectiveHourly = calculateEffectiveHourly();
        let cost = parseFloat($inputCost.value);
        outputResults(cost, effectiveHourly);
    });
}


window.onload = main;