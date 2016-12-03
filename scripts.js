$(function() {
	//GET/READ
	$('#get-button').on('click', function() {
		$.ajax({
			url: '/products',
			contentType: 'application/json',
			success: function(response){
				var tbodyEl = $('tbody');

				tbodyEl.html('');

				response.products.forEach(function(product){
					tbodyEl.append('\
						<tr>\
							<td class="id">' + product.id + '</td>\
							<td><input type="text" class="name"	value="' + product.name + '"></td>\
							<td>\
							<button class="update-button">UPDATE/PUT</button>\
							<button class="delete-button">DELETE</button>\
							</td>\
						</tr>\
					');
				});

			}
		});
	});
	//CREATE/POST
	$('#create-form').on('submit', function(e){
		e.preventDefault();

		var createInput = $('#create-input');

		$.ajax({
			url: '/products',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ name: createInput.val() }),
			success: function(req, res){
				console.log(res);
				createInput.val('');
				$('#get-button').click();
			}
		});
	});

	//UPDATE/PUT
	$('table').on('click', '.update-button', function(){

		var rowEl = $(this).closest('tr'),
			id = rowEl.find('.id').text(),
			newName = rowEl.find('.name').val();

		$.ajax({
			url: '/products/' + id,
			method: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({ newName: newName}),
			success: function(res){
				console.log(res);
				$('#get-button').click();
			}
		});
	});
	// DELETE
	$('table').on('click', '.delete-button', function(){
		var rowEl = $(this).closest('tr'),
			id = rowEl.find('.id').text();

			$.ajax({
				url: '/products/' + id,
				method: 'DELETE',
				contentType: 'application/json',
				success: function(res){
					console.log(res);
					$('#get-button').click();
				}
			});
	});



});