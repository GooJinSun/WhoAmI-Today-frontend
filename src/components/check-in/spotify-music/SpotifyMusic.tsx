import { Track } from '@spotify/web-api-ts-sdk';
import React from 'react';
import { Font, Layout, SvgIcon } from '@design-system';

interface SpotifyMusicProps {
  track: Track;
  width?: number;
  containerStyle?: React.CSSProperties;
}

function SpotifyMusic({ track, width = 200, containerStyle }: SpotifyMusicProps) {
  return (
    <Layout.FlexRow
      outline="SPOTIFY_GREEN"
      ph={8}
      pv={4}
      gap={4}
      rounded={12}
      alignItems="center"
      bgColor="WHITE"
      w={width}
      style={{
        flexShrink: 0,
        ...containerStyle,
      }}
    >
      <img
        src={track.album.images[0].url}
        width={16}
        height={16}
        alt={`${track.name}-album`}
        style={{
          borderRadius: 4,
        }}
      />
      <Font.Body type="12_semibold" numberOfLines={1}>
        {track.artists[0].name} - {track.name}
      </Font.Body>
      <Layout.LayoutBase w={16} h={16}>
        <SvgIcon name="spotify" size={16} />
      </Layout.LayoutBase>
    </Layout.FlexRow>
  );
}

export default SpotifyMusic;
