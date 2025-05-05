// Modal functionality
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = "none";
  }
}

// Tab functionality
function openTab(evt, tabName) {
  // Hide all tab content
  var tabcontent = document.getElementsByClassName("tab-content");
  for (var i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove active class from all tabs
  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].className = tabs[i].className.replace(" active", "");
  }

  // Show the current tab and add active class
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Table filtering functionality
function filterTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  const filter = input.value.toUpperCase();
  const table = document.getElementById(tableId);
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) {
    let shouldShow = false;
    const td = tr[i].getElementsByTagName("td");
    
    for (let j = 0; j < td.length; j++) {
      if (td[j]) {
        const txtValue = td[j].textContent || td[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          shouldShow = true;
          break;
        }
      }
    }
    
    tr[i].style.display = shouldShow ? "" : "none";
  }
}

// Table row click handler
function makeTableRowsClickable(tableId, urlPrefix) {
  const table = document.getElementById(tableId);
  if (!table) return;
  
  const rows = table.getElementsByTagName('tr');
  for (let i = 1; i < rows.length; i++) {
    rows[i].style.cursor = 'pointer';
    rows[i].addEventListener('click', function() {
      const id = this.getAttribute('data-id');
      if (id) {
        window.location.href = urlPrefix + id + '.html';
      }
    });
  }
}

// Export table to CSV/Excel
function exportTableToCSV(tableId, filename = 'export.csv') {
  const table = document.getElementById(tableId);
  let csv = [];
  const rows = table.querySelectorAll('tr');
  
  for (let i = 0; i < rows.length; i++) {
    const row = [], cols = rows[i].querySelectorAll('td, th');
    
    for (let j = 0; j < cols.length; j++) {
      // Replace any commas in the cell data with spaces to avoid CSV issues
      let data = cols[j].innerText.replace(/,/g, ' ');
      // Escape double quotes with two double quotes
      data = data.replace(/"/g, '""');
      // If the data contains commas, newlines, or double quotes, enclose it in double quotes
      row.push('"' + data + '"');
    }
    
    csv.push(row.join(','));
  }
  
  // Download CSV file
  downloadCSV(csv.join('\n'), filename);
}

function downloadCSV(csv, filename) {
  const csvFile = new Blob([csv], {type: 'text/csv'});
  const downloadLink = document.createElement('a');
  
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = 'none';
  
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Date range validation
function validateDateRange() {
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  
  if (!startDate || !endDate) {
    alert('Please select both start and end dates.');
    return false;
  }
  
  if (new Date(startDate) > new Date(endDate)) {
    alert('Start date must be before end date.');
    return false;
  }
  
  return true;
}

// Image preview functionality
function showImagePreview(imgId) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('fullImage');
  const img = document.getElementById(imgId);
  
  modal.style.display = "block";
  modalImg.src = img.src;
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the first tab as active if exists
  const firstTab = document.querySelector('.tab');
  const firstTabContent = document.querySelector('.tab-content');
  
  if (firstTab && firstTabContent) {
    firstTab.classList.add('active');
    firstTabContent.style.display = 'block';
  }
  
  // Make client list table rows clickable
  makeTableRowsClickable('clientListTable', './client-detail-');
  
  // Add event listeners to close buttons
  const closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });
  
  // Add event listener to image modal close button
  const imageModalClose = document.querySelector('.image-modal-close');
  if (imageModalClose) {
    imageModalClose.addEventListener('click', function() {
      document.getElementById('imageModal').style.display = 'none';
    });
  }
}); 