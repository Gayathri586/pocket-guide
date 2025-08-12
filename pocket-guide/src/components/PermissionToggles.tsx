import { useAppStore } from '../store/userStore';

export default function PermissionToggles() {
  const { permissions, grantPermission } = useAppStore();

  const requestLocation = async () => {
    if (!('geolocation' in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      () => grantPermission('locationGranted', true),
      () => grantPermission('locationGranted', false)
    );
  };

  const requestNotifications = async () => {
    if (!('Notification' in window)) return;
    const perm = await Notification.requestPermission();
    grantPermission('notificationsGranted', perm === 'granted');
  };

  return (
    <div className="perm-grid">
      <label className={`perm ${permissions.locationGranted ? 'on' : ''}`}>
        <input type="checkbox" checked={permissions.locationGranted} onChange={requestLocation} />
        <span>Location</span>
      </label>
      <label className={`perm ${permissions.callLogGranted ? 'on' : ''}`}>
        <input
          type="checkbox"
          checked={permissions.callLogGranted}
          onChange={(e) => grantPermission('callLogGranted', e.target.checked)}
        />
        <span>Call Log (mobile only)</span>
      </label>
      <label className={`perm ${permissions.notificationsGranted ? 'on' : ''}`}>
        <input type="checkbox" checked={permissions.notificationsGranted} onChange={requestNotifications} />
        <span>Notifications</span>
      </label>
    </div>
  );
}