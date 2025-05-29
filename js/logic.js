

import { productsList } from "data/productList.js";

const productItemsList = document.querySelector(".product-table");
document.querySelector(".add-new-product-button").addEventListener("click", addProduct);

displayProducts(productsList);

function displayProducts(products) {
    console.log('calling', products);
    products.forEach((product, index) => {
      const productItem = productItemsList.insertRow(index+1);
      productItem.className = "product-items-list";
      productItem.insertCell(0).innerHTML = `<img class="product-img" src=${product.productImage} /> ${product.productName}`;
      productItem.insertCell(1).textContent = product.productCategory;
      productItem.insertCell(2).textContent = `${product.productPrice}`;
      productItem.insertCell(3).innerHTML = `<img class="product-img" src=${product.productCompanyImage} /> ${product.productCompany}`;
      productItem.insertCell(4).innerHTML = product.productStatus ? `<img src="../image/Instock.png" alt="In stock" />` : `<img src="../image/Outstock.png" alt="Out of stock" />`;

      const editButton = document.createElement('button');
      editButton.value = product.productId;
      editButton.className = "edit-btn";
    //   editButton.textContent  = "Edit"
      editButton.innerHTML = `<img src="../image/Pencil.png" alt="edit" />`;
      
  
      editButton.addEventListener("click", function(e) {
        const productId = e.currentTarget.value;
        editProduct(productId)
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.value = product.productId; 
      deleteButton.className = "del-btn";
      deleteButton.innerHTML =  `<img src="../image/Bin.png" alt="del" />`;

      deleteButton.addEventListener("click", deleteProduct);
  
      const buttonCell = productItem.insertCell(5);
      buttonCell.appendChild(editButton);
      buttonCell.appendChild(deleteButton);
    });
  }
  

function editProduct(editProductId) {

    const r = productsList[editProductId]

    const productFormHTML = ` <div class="add-items-layout">
    <div class="top-bar">
        <span class="add-new-product-content">Add new product</span>
        <span class="close-button">X</span>
    </div>
    
    <form id="update-product">
        <div class="product-details">
            <div class="input-layout">

            <div class="product-name-area">
                <label for="Name">
                    <span class="product-icon">
                        ic
                    </span>
                    <span class="product-name">
                        Product name
                    </span>
                </label>
                <input class="product-input-data product-name" type="text" id="Name">
            </div>
            
            <div class="product-image-area">
                <label class="product-image" for="image">Product image</label>
                <input class="product-input-image product-image" type="text" id="image">
            </div>

            <div class="product-name-area">
                <label class="product-category" for="Category">Category</label>
                <select class="product-category-select" id="Category">
                    <option select="selected" value="Accessories">Accessories</option>
                    <option value="Telecommunication">Telecommunication</option>
                    <option value="Note Book">Note Book</option>
                    <option value="Digital">Digital</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Light">Light</option>
                </select>
            </div>

            <div class="product-name-area">
                <label for="Price">$ Price(in $)</label>
                <input class="product-input-data" type="text" id="Price">
            </div>

            <div class="product-name-area">
                <label for="Company">Company</label>
                <select class="product-company-select" id="Company">
                    <option value="Google">Google</option>
                    <option value="Webflow">Webflow</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Reddit">Reddit</option>
                    <option value="Spotify">Spotify</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="Twitch">Twitch</option> 
                </select>
            </div>

            <div class="product-name-area">
                <label for="Status">Status</label>
                <select class="product-status-select" name="Status" id="Status">
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </div>
            </div>
        </div>
        <div class="save-product">
            <button  type="submit">Save</button>
        </div>
    </form>
    </div>
    `

    const productFormContainer = document.getElementById("product-form-container");
    productFormContainer.innerHTML = productFormHTML;
    productFormContainer.style.display = "block";

    document.getElementById('Name').value = r.productName || '';
    document.getElementById('image').value = r.productImage || '';
    document.getElementById('Category').value = r.productCategory || 'Accessories';
    document.getElementById('Price').value = r.productPrice || '';
    document.getElementById('Company').value = r.productCompany || 'Google';
    document.getElementById('Status').value = r.productStatus ? 'true' : 'false';

    const closeButton = productFormContainer.querySelector(".close-button");
    closeButton.addEventListener("click", function() {
        productFormContainer.style.display = "none";
    });
    

    document.getElementById('update-product').addEventListener('submit', function(event) {
      event.preventDefault(); 


      const productName = document.getElementById('Name').value;
      const productImage = document.getElementById('image').value;
      const productCategory = document.getElementById('Category').value;
      const productPrice = document.getElementById('Price').value;
      const productCompany = document.getElementById('Company').value;
      const productStatus = document.getElementById('Status').value;

      const productData = {
          productId: productsList.length,
          productName: productName,
          productCategory: productCategory,
          productPrice: productPrice,
          productCompany: productCompany,
          productStatus: productStatus,
          productImage: productImage,
      };

  

      productsList[editProductId].productName = productName
      productsList[editProductId].productCategory = productCategory
      productsList[editProductId].productCompany = productCompany
      productsList[editProductId].productStatus = productStatus
      productsList[editProductId].productImage = productImage
      productsList[editProductId].productPrice = productPrice

      const rowToUpdate = productItemsList.rows[editProductId]; 
      console.log('rowupdate', rowToUpdate)

      rowToUpdate.cells[0].textContent = productName;
      rowToUpdate.cells[1].textContent = productCategory;
      rowToUpdate.cells[2].textContent = `${productPrice}`;
      rowToUpdate.cells[3].textContent = productCompany;
      rowToUpdate.cells[4].textContent = productStatus ? `In Stock` : `Out of Stock`;

      
  });


}

function deleteProduct(e) {
    const deleteItem = e.target.closest('tr')
    if (deleteItem) {
        productItemsList.deleteRow(deleteItem.rowIndex); 
    }
    productsList = productsList.filter((ele)=> ele.productId !== e.target.value)
    console.log("Delete button clicked for product ID:", productsList);
    
}

export function addProduct() {
    console.log('add product')
    const productFormHTML = ` <div class="add-items-layout">
    <div class="top-bar">
        <span class="add-new-product-content">Add new product</span>
        <span class="close-button">X</span>
    </div>
    
    <form id="add-new-product">
        <div class="product-details">
            <div class="input-layout">

            <div class="product-name-area">
                <label for="Name">
                    <span class="product-icon">
                        ic
                    </span>
                    <span class="product-name">
                        Product name
                    </span>
                </label>
                <input class="product-input-data product-name" type="text" id="Name">
            </div>
            
            <div class="product-image-area">
                <label class="product-image" for="image">Product image</label>
                <input class="product-input-image product-image" type="file" id="image">
            </div>

            <div class="product-name-area">
                <label class="product-category" for="Category">Category</label>
                <select class="product-category-select" id="Category">
                    <option select="selected" value="Accessories">Accessories</option>
                    <option value="Telecommunication">Telecommunication</option>
                    <option value="Note Book">Note Book</option>
                    <option value="Digital">Digital</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="Light">Light</option>
                </select>
            </div>

            <div class="product-name-area">
                <label for="Price">$ Price(in $)</label>
                <input class="product-input-data" type="text" id="Price">
            </div>

            <div class="product-name-area">
                <label for="Company">Company</label>
                <select class="product-company-select" id="Company">
                    <option value="Google">Google</option>
                    <option value="Webflow">Webflow</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Twitter">Twitter</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Reddit">Reddit</option>
                    <option value="Spotify">Spotify</option>
                    <option value="Pinterest">Pinterest</option>
                    <option value="Twitch">Twitch</option> 
                </select>
            </div>

            <div class="product-name-area">
                <label for="Status">Status</label>
                <select class="product-status-select" name="Status" id="Status">
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>
            </div>
            </div>
        </div>
        <div class="save-product">
            <button  type="submit">Save</button>
        </div>
    </form>
    </div>

    `

    const productFormContainer = document.getElementById("product-form-container");
    productFormContainer.innerHTML = productFormHTML;
    productFormContainer.style.display = "block";

    const closeButton = productFormContainer.querySelector(".close-button");
    closeButton.addEventListener("click", function() {
        productFormContainer.style.display = "none";
    });

    document.getElementById('add-new-product').addEventListener('submit', function(event) {
      event.preventDefault(); 

      const productName = document.getElementById('Name').value;
      const productImage = document.getElementById('image').value;
      const productCategory = document.getElementById('Category').value;
      const productPrice = document.getElementById('Price').value;
      const productCompany = document.getElementById('Company').value;
      const productStatus = document.getElementById('Status').value;
      

      if(productName.trim() ==='' || productPrice <=0  ) {
        alert('Enter correct input');
        return;
      }

      const productData = {
          productId: productsList.length,
          productName: productName,
          productCategory: productCategory,
          productPrice: productPrice,
          productCompany: productCompany,
          productStatus: productStatus,
          productImage: productImage,
      };

      productsList.push(productData);
      console.log('add-item',productsList.length, productsList[productsList.length-1].productName);

      console.log('Product Data:', productData);


      const productItem = productItemsList.insertRow(productsList.length);
      productItem.className = "product-items-list";
      productItem.insertCell(0).innerHTML = `<img class="product-img" src=${productImage} /> ${productName}`;
      productItem.insertCell(1).textContent = productCategory;
      productItem.insertCell(2).textContent = `${productPrice}`;
      productItem.insertCell(3).textContent = productCompany;
      productItem.insertCell(4).innerHTML = productStatus ? `<img src="image/Instock.png" alt="In stock" />` : `<img src="image/Outstock.png" alt="Out of stock" />`;
    //   productItem.insertCell(4).textContent = productStatus ? `In Stock` : `Out of Stock`;

      const editButton = document.createElement('button');
      editButton.value = productsList.length;
      editButton.className = "edit-btn";
      editButton.innerHTML = `<img src="../image/Pencil.png" alt="edit" />`;
    //   editButton.textContent = "Edit";
  
      editButton.addEventListener("click", editProduct);
  
      const deleteButton = document.createElement('button');
      deleteButton.value = productsList.length; 
      deleteButton.className = "del-btn";
      deleteButton.innerHTML = `<img src="../image/Bin.png" alt="edit" />`;
    //   deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", deleteProduct);
  
      const buttonCell = productItem.insertCell(5);
      buttonCell.appendChild(editButton);
      buttonCell.appendChild(deleteButton);


  });

}


console.log(productsList)