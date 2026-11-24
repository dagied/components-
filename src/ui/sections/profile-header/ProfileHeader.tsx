import React from 'react';
import { cn } from '@/ui/utils/cn';
import { Avatar } from '@/ui/primitives/avatar/Avatar';
import { Badge } from '@/ui/primitives/badge/Badge';
import { Button } from '@/ui/primitives/button/Button';
import { MapPin, Calendar, CheckCircle2, Share2, Settings, Mail } from 'lucide-react';

export interface ProfileStat {
  label: string;
  value: string | number;
}

export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  handle?: string;
  avatarUrl?: string;
  coverUrl?: string;
  role?: string;
  bio?: string;
  location?: string;
  joinedDate?: string;
  isVerified?: boolean;
  stats?: ProfileStat[];
  isOwner?: boolean;
  onEditProfile?: () => void;
  onShare?: () => void;
  onMessage?: () => void;
  actions?: React.ReactNode;
}

export function ProfileHeader({
  name = 'Dagmawi B.',
  handle = '@dagm',
  avatarUrl,
  coverUrl,
  role = 'Principal Frontend Architect & UI Engineer',
  bio = 'Crafting production-grade React 19 design systems and web apps. Passionate about OKLCH color spaces, accessibility, and Ethiopic digital experiences.',
  location = 'Addis Ababa, Ethiopia',
  joinedDate = 'Joined March 2024',
  isVerified = true,
  stats = [
    { label: 'Components Created', value: '64' },
    { label: 'Courses Completed', value: '12' },
    { label: 'Certifications', value: '5' },
    { label: 'Contributions', value: '1.4k' },
  ],
  isOwner = true,
  onEditProfile,
  onShare,
  onMessage,
  actions,
  className,
  ...props
}: ProfileHeaderProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-surface-border bg-surface-card overflow-hidden shadow-xs',
        className
      )}
      {...props}
    >
      {/* Cover Banner */}
      <div className="relative h-44 sm:h-56 w-full bg-gradient-to-r from-primary-900 via-secondary-900 to-accent-950 overflow-hidden">
        {coverUrl ? (
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent" />
        )}
      </div>

      {/* Main Profile Info Section */}
      <div className="relative px-6 sm:px-8 pb-8 pt-0">
        {/* Top row with Avatar pulling up into cover + Action buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6">
          <div className="relative inline-block">
            <Avatar
              src={avatarUrl}
              name={name}
              size="xl"
              className="ring-4 ring-surface-card shadow-lg bg-surface-card w-20 h-20 text-2xl"
            />
            {isVerified && (
              <div
                className="absolute bottom-1 right-1 p-1 rounded-full bg-primary-500 text-white ring-2 ring-surface-card"
                title="Verified Account"
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            {actions || (
              <>
                {isOwner ? (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<Settings className="w-4 h-4" />}
                    onClick={onEditProfile}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={onEditProfile}
                    >
                      Follow
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Mail className="w-4 h-4" />}
                      onClick={onMessage}
                    >
                      Message
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  aria-label="Share profile"
                  onClick={onShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* User Identity */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-surface-foreground">
                {name}
              </h2>
              {handle && (
                <span className="text-xs sm:text-sm text-surface-foreground-subtle font-mono">
                  {handle}
                </span>
              )}
            </div>
            {role && (
              <p className="text-xs sm:text-sm font-medium text-primary-500 mt-0.5">
                {role}
              </p>
            )}
          </div>

          {/* Bio */}
          {bio && (
            <p className="text-xs sm:text-sm text-surface-foreground-muted max-w-3xl leading-relaxed">
              {bio}
            </p>
          )}

          {/* Meta details: location & joined */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-surface-foreground-subtle pt-1">
            {location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-surface-foreground-subtle" />
                <span>{location}</span>
              </div>
            )}
            {joinedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-surface-foreground-subtle" />
                <span>{joinedDate}</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Strip */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-surface-border/70">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-lg sm:text-xl font-display font-extrabold text-surface-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-surface-foreground-subtle mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
