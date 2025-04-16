/**
 * Renders the website footer with information, navigation links, social icons, and a newsletter signup.
 * Includes semantic HTML and accessibility enhancements.
 */
export function renderFooter() {
    const footer = document.querySelector("footer");
    
    footer.innerHTML = `
    <div class="bg-secondary text-white px-10 md:px-20 py-10 flex flex-wrap gap-10 justify-between text-sm pb-20 sm:pb-10" role="contentinfo" aria-label="Footer">
      
      <!-- About -->
      <div class="flex-1 min-w-[200px]">
        <h4 class="text-lg font-semibold mb-2">About PetPal</h4>
        <p>Helping pets find loving homes since 2025.</p>
      </div>

      <!-- Quick Links -->
      <div class="flex-1 min-w-[150px]">
        <h4 class="text-lg font-semibold mb-2">Quick Links</h4>
        <ul class="space-y-1">
          <li><a href="#" class="hover:underline" aria-label="View all products">Shop All</a></li>
          <li><a href="#" class="hover:underline" aria-label="Order custom items">Custom Orders</a></li>
          <li><a href="#" class="hover:underline" aria-label="Learn more about PetPal">About Us</a></li>
          <li><a href="#" class="hover:underline" aria-label="Contact PetPal">Contact</a></li>
        </ul>
      </div>

      <!-- Support -->
      <div class="flex-1 min-w-[150px]">
        <h4 class="text-lg font-semibold mb-2">Support</h4>
        <ul class="space-y-1">
          <li><a href="#" class="hover:underline" aria-label="Frequently Asked Questions">FAQ</a></li>
          <li><a href="#" class="hover:underline" aria-label="Shipping information">Shipping Info</a></li>
          <li><a href="#" class="hover:underline" aria-label="Return policy">Returns</a></li>
        </ul>
      </div>

      <!-- Newsletter Signup -->
      <div class="flex-1 min-w-[200px]">
        <h4 class="text-lg font-semibold mb-2">Newsletter</h4>
        <p class="mb-2">Subscribe for updates!</p>
        <form class="flex" aria-label="Newsletter subscription form">
          <input
            type="email"
            placeholder="Your email"
            aria-label="Enter your email address"
            required
            class="px-3 py-2 rounded-l-full w-full text-black"
          />
          <button
            type="submit"
            class="bg-primary text-white px-4 py-2 rounded-r-full"
            aria-label="Subscribe to newsletter"
          >
            <i class="fas fa-paper-plane" aria-hidden="true"></i>
          </button>
        </form>
      </div>

      <!-- Footer Bottom -->
      <div class="w-full text-center text-xs mt-10">
        <p>© 2025 PetPal. All rights reserved.</p>
        <div class="mt-2 space-x-4 text-lg" aria-label="Social media links">
          <a href="#" aria-label="PetPal on Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" aria-label="PetPal on X (formerly Twitter)"><i class="fab fa-x"></i></a>
          <a href="#" aria-label="PetPal on Facebook"><i class="fab fa-facebook"></i></a>
          <a href="#" aria-label="PetPal on Pinterest"><i class="fab fa-pinterest"></i></a>
        </div>
      </div>
    </div>
  `;
}
