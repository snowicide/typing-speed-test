import { StatsRow } from './StatsRow';
import { SettingsRow } from './SettingsRow';

export function Stats() {
  return (
    <div className='container pb-4 mb-8 mx-auto border-b border-[#3A3A3A] max-w-312'>
      <div className='flex flex-col max-w-312 lg:flex-row lg:items-center lg:gap-0 gap-5 justify-center lg:justify-between'>
        <div className='flex-1 lg:min-w-0'>
          <StatsRow />
        </div>

        <div className='flex-initial lg:min-w-0'>
          <SettingsRow />
        </div>
      </div>
    </div>
  );
}
