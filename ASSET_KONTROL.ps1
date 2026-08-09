param(
    [Parameter(Mandatory = $true)]
    [string]$AssetsDirectory
)

$ErrorActionPreference = "Stop"
$missing = New-Object System.Collections.Generic.List[string]

# Meggy: yalnız aktif çalışma kabuğunun gerçekten ihtiyaç duyduğu
# ortak assetler başlangıcı engelleyebilir. JOA/Tavern/karakter/taksonomi
# ve resource-bar varlıkları bu ürün kolunun zorunlu bağımlılığı değildir.
$required = @(
    'alekrythae_logo.png',
    'Bluemoon.png',
    'card_shell_canonical.png',
    'card_shell_master.png',
    'card_moon_emblem.png',
    'energy_aia_ref.png',
    'energy_arcana_ref.png',
    'energy_mageen_ref.png',
    'energy_mana_ref.png',
    'energy_skill_ref.png',
    'meggy.png'
)

foreach ($relative in $required) {
    $full = Join-Path $AssetsDirectory $relative
    if (-not (Test-Path -LiteralPath $full -PathType Leaf)) {
        $missing.Add($relative)
    }
}

if ($missing.Count -gt 0) {
    Write-Host ''
    Write-Host '[HATA] Calisma ortaminin cagirdigi assetlerden bazilari bulunamadi:' -ForegroundColor Red
    $missing | Sort-Object -Unique | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
    Write-Host ''
    Write-Host 'Uygulama eksik temel assetle baslatilmadi.' -ForegroundColor Red
    exit 1
}

Write-Host "[TAMAM] Meggy temel asset kontrolu gecti." -ForegroundColor Green
exit 0
