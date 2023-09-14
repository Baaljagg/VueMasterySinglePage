app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /*html*/
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :class = "{'out-of-stock-img': !inStock }"   :src="image">
      </div>
      <div class="product-info">

        <h1>{{ title }}</h1>

        <p>{{ sale }}</p>

        <a :href="url">Made.....</a>

        <!-- <p v-show="inStock">In Stock</p> -->

<!--             <p v-if="inventory > 10"> Available</p>
        <p v-else-if="inventory <= 10 && inventory > 0"> Almost sold out</p>
        <p v-else>Out of Stock</p>
        <ul> -->

        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <p>Shipping: {{ shipping }} </p>
        
        <product-details :details="details" ></product-details>

        <ul>
          <li v-for="size in sizes">{{ size }}</li>
        </ul>
        <ul>
          <li v-for="(size, index) in sizes" :key="index">{{ size }}</li>
        </ul>


        <div 
          v-for="(variant, index) in variants" 
          :key="variant.id" 
          @mouseover="updateImageVariant(index)"
          class="color-circle"
          :style="{ backgroundColor: variant.color }">
        </div>
        
        <button 
          class="button" 
          :class="{ disabledButton: !inStock }"
          :disabled="!inStock"
          @click="addToCart">
          Add to Cart
        </button>
        <button class="button" @click="removeFromCart">Remove item</button>

      </div>
    </div>`,

    data() {
        return {
            product: 'Socks',
            brand: 'GARMIN',
            selectedImageVariant: 0,
            url: 'https://www.google.com',
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                { id: 2234, color: "green", image: './assets/images/socks_green.jpg', quantity: 50 },
                { id: 2235, color: "blue", image: './assets/images/socks_blue.jpg', quantity: 0 },
            ],
            sizes: ["S", "M", "L", "XL"],

            onSale: true
        }
    },

    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedImageVariant].image
        },
        inStock() {
            return this.variants[this.selectedImageVariant].quantity
        },
        shipping(){
            if (this.premium)
                return "Free"
            return 2.99
        },

        sale() {
            if(this.onSale)
                return this.brand + " " + this.product + " is on sale"
            return ""
        },
    },

    methods: {
        addToCart() {
            this.cart += 1
        },
        updateImageVariant(index) {
            this.selectedImageVariant = index
        },
        removeFromCart(){
            if(this.cart > 0)
            this.cart -=1
        },
    }


})