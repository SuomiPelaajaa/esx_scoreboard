var visable = false;

$(function () {
	window.addEventListener('message', function (event) {
		switch (event.data.action) {
			
			case 'toggle':
				if (visable) {
					$('#wrap').fadeOut();
				} else {
					$('#wrap').fadeIn();
				}

				visable = !visable;
				break;

			case 'close':
				$('#wrap').fadeOut();
				visable = false;
				break;

			case 'toggleID':
				if (event.data.state) {
					$('th:nth-child(2)').show();
					$('td:nth-child(2)').show();
				} else {
					$('th:nth-child(2)').hide();
					$('td:nth-child(2)').hide();
				}
				break;

			case 'updatePlayerJobs':
				var jobs = event.data.jobs;
				$('#player_count').html(jobs.player_count);
				$('#ems').html(jobs.ems);
				$('#police').html(jobs.police);
				$('#sheriff').html(jobs.sheriff);
				$('#taxi').html(jobs.taxi);
				$('#mechanic').html(jobs.mechanic);
				$('#cardealer').html(jobs.cardealer);
				$('#estate').html(jobs.estate);
				break;

			case 'updatePlayerList':
				$('#playerlist tr:gt(0)').remove();
				$('#playerlist').append(event.data.players);
				applyPingColor();
				sortPlayerList();
				break;

			case 'updatePing':
				updatePing(event.data.players);
				applyPingColor();
				break;

			case 'updateServerInfo':
				if (event.data.maxPlayers) {
					$('#max_players').html(event.data.maxPlayers);
				}
				break;

			default:
				console.log('esx_scoreboard: unknown action!');
				break;
		}
	}, false);
});

function applyPingColor() {
	$('#playerlist tr').each(function () {
		$(this).find('td:nth-child(5)').each(function () {
			var ping = $(this).html();
			var color = '#00e68a';

			if (ping > 50 && ping < 80) {
				color = '#ff8000';
			} else if (ping >= 80) {
				color = '#ff0000';
			}

			$(this).css('color', color);
			$(this).html(ping + "<span style='color:#ffffff;'> ms</span>");
		});

	});
}

function updatePing(players) {
	jQuery.each(players, function (i, v) {
		if (v != null) {
			$('#playerlist tr:not(.heading)').each(function () {
				$(this).find('td:nth-child(2):contains(' + v.id + ')').each(function () {
					$(this).parent().find('td').eq(4).html(v.ping);
				});
			});
		}
	});
}

function sortPlayerList() {
	var table = $('#playerlist'),
		rows = $('tr:not(.heading)', table);

	rows.sort(function(a, b) {
		var keyA = $('td', a).eq(1).html();
		var keyB = $('td', b).eq(1).html();

		return (keyA - keyB);
	});

	rows.each(function(index, row) {
		table.append(row);
	});
}
