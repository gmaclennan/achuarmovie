// PROTOTYPES

String.prototype.isSalutation = function() {
	return (this.match(/^(Mr|Ms|Miss|Mrs|Dr|Sir|Sr|Sra)\.?$/i) !== null);
}

String.prototype.isSuffix = function() {
  return (this.match(/^(Sr|Jr|Phd|I+)\.?$/i) !== null);
}

function parseName(target) {
	var parts = $(target).val().split(" ");
  var fName = "";
  var lName = "";
	
	switch(parts.length) {
		case 1:
      fName = parts[0];
			break;
		case 2:
      fName = parts[0];
      lName = parts[1];
      break;
		case 3:
      if (parts[0].isSalutation()) {
        fName = parts.slice(0,2).join(' ');
        lName = parts[2];
      } else {
        fName = parts[0];
        lName = parts.slice(-2).join(' ');
      }
      break;
		case 4:
      if (!parts[0].isSalutation() && parts[3].isSuffix()) {
        fName = parts[0];
        lName = parts.slice(-3).join(' ');
      } else {
        fName = parts.slice(0,2).join(' ');
        lName = parts.slice(-2).join(' ');
      }
      break;
		default:
      fName = parts.slice(0,2).join(' ');
      lName = parts.slice(2-parts.length).join(' ');
	}
  
  $('input[name="FIRST"]').val(fName);
  $('input[name="LAST"]').val(lName);

}
