export default function darkMode() {
    const htmlElement = document.documentElement;

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.dataset.theme = 'dark';
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.dataset.theme = 'light'; // Or remove the attribute: delete htmlElement.dataset.theme;
            localStorage.setItem('theme', 'light');
        }
    }

    // Check for saved theme preference or system preference on load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default to light if no preference
    }

    // Find all light switch elements
    const lightSwitches = document.querySelectorAll('.light-switch');

    if (lightSwitches.length > 0) {
        // Set initial state of switches based on current mode
        lightSwitches.forEach((lightSwitch) => {
            lightSwitch.checked = htmlElement.dataset.theme === 'dark';

            // Add event listener to each switch
            lightSwitch.addEventListener('change', () => {
                const { checked } = lightSwitch;
                const newTheme = checked ? 'dark' : 'light';
                applyTheme(newTheme);

                // Sync all switches to the same state
                lightSwitches.forEach((el) => {
                    el.checked = checked;
                });
            });
        });
    }
}